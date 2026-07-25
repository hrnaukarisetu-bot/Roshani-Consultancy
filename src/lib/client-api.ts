type D1Result<T = Record<string, unknown>> = { results?: T[]; success: boolean; meta?: unknown };
type D1Statement = {
  bind: (...values: unknown[]) => D1Statement;
  all: <T = Record<string, unknown>>() => Promise<D1Result<T>>;
  first: <T = Record<string, unknown>>() => Promise<T | null>;
  run: () => Promise<D1Result>;
};
type D1Database = {
  prepare: (sql: string) => D1Statement;
  batch: (statements: D1Statement[]) => Promise<D1Result[]>;
};
type R2Object = { body: ReadableStream; httpMetadata?: { contentType?: string } };
type R2Bucket = {
  get: (key: string) => Promise<R2Object | null>;
  put: (
    key: string,
    value: ArrayBuffer,
    options?: { httpMetadata?: { contentType?: string } },
  ) => Promise<unknown>;
  delete: (key: string) => Promise<void>;
};
type ClientEnv = {
  CLIENTS_DB?: D1Database;
  CLIENT_LOGOS?: R2Bucket;
  ADMIN_PASSWORD?: string;
  ADMIN_SESSION_SECRET?: string;
};

const json = (data: unknown, status = 200, headers?: HeadersInit) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...headers,
    },
  });
const text = (value: unknown) =>
  String(value ?? "")
    .trim()
    .replace(/\s+/g, " ");
const slugify = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "client";
const parseCookies = (request: Request) =>
  Object.fromEntries(
    (request.headers.get("cookie") || "")
      .split(";")
      .map((part) => part.trim().split("=").map(decodeURIComponent))
      .filter((pair) => pair.length === 2),
  );
const encoder = new TextEncoder();
const hex = (bytes: ArrayBuffer) =>
  [...new Uint8Array(bytes)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
async function hmac(value: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return hex(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}
async function sessionCookie(env: ClientEnv) {
  const expires = String(Date.now() + 8 * 60 * 60 * 1000);
  return `${expires}.${await hmac(expires, env.ADMIN_SESSION_SECRET || "")}`;
}
async function isAdmin(request: Request, env: ClientEnv) {
  const token = parseCookies(request).client_admin_session;
  if (!token || !env.ADMIN_SESSION_SECRET) return false;
  const [expires, signature] = token.split(".");
  return (
    Number(expires) > Date.now() && signature === (await hmac(expires, env.ADMIN_SESSION_SECRET))
  );
}
function csrfValid(request: Request) {
  const cookies = parseCookies(request);
  const header = request.headers.get("x-csrf-token");
  return Boolean(header && cookies.client_admin_csrf && header === cookies.client_admin_csrf);
}
function dbRequired(env: ClientEnv) {
  return env.CLIENTS_DB || null;
}
const selectClients = `SELECT c.*, COALESCE(group_concat(s.service_name, '|||'), '') AS service_names FROM clients c LEFT JOIN client_services cs ON cs.client_id=c.id LEFT JOIN services s ON s.id=cs.service_id`;
function mapClient(row: Record<string, unknown>, includePrivate = false) {
  const result: Record<string, unknown> = {
    id: String(row.id),
    companyName: row.company_name,
    slug: row.slug,
    natureOfBusiness: row.nature_of_business,
    city: row.city,
    logo: row.logo ? `/api/client-logos/${row.logo}` : undefined,
    logoAltText: row.logo_alt_text || undefined,
    shortDescription: row.short_description || undefined,
    projectRequirement: row.project_requirement || undefined,
    solutionProvided: row.solution_provided || undefined,
    resultSummary: row.result_summary || undefined,
    testimonial: row.testimonial || undefined,
    testimonialPersonName: row.testimonial_person_name || undefined,
    testimonialPersonDesignation: row.testimonial_person_designation || undefined,
    websiteUrl: row.website_url || undefined,
    displayOrder: Number(row.display_order),
    isFeatured: Boolean(row.is_featured),
    isPublished: Boolean(row.is_published),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    services: text(row.service_names).split("|||").filter(Boolean),
  };
  if (includePrivate) result.clientName = row.client_name || "";
  return result;
}
function validateClient(input: Record<string, unknown>) {
  const companyName = text(input.companyName);
  const natureOfBusiness = text(input.natureOfBusiness);
  const city = text(input.city);
  if (!companyName || !natureOfBusiness || !city)
    throw new Error("Company name, nature of business and city are required.");
  const websiteUrl = text(input.websiteUrl);
  if (websiteUrl && !/^https?:\/\//i.test(websiteUrl))
    throw new Error("Website URL must start with http:// or https://.");
  return {
    clientName: text(input.clientName),
    companyName,
    slug: text(input.slug) || slugify(`${companyName}-${city}`),
    natureOfBusiness,
    city,
    logoAltText: text(input.logoAltText),
    shortDescription: text(input.shortDescription),
    projectRequirement: text(input.projectRequirement),
    solutionProvided: text(input.solutionProvided),
    resultSummary: text(input.resultSummary),
    testimonial: text(input.testimonial),
    testimonialPersonName: text(input.testimonialPersonName),
    testimonialPersonDesignation: text(input.testimonialPersonDesignation),
    websiteUrl,
    displayOrder: Math.max(0, Number(input.displayOrder) || 0),
    isFeatured: input.isFeatured ? 1 : 0,
    isPublished: input.isPublished === false ? 0 : 1,
    services: Array.isArray(input.services)
      ? [...new Set(input.services.map(text).filter(Boolean))].slice(0, 30)
      : [],
  };
}
async function syncServices(db: D1Database, clientId: number, services: string[]) {
  await db.prepare("DELETE FROM client_services WHERE client_id=?").bind(clientId).run();
  for (const name of services) {
    const slug = slugify(name);
    await db
      .prepare("INSERT OR IGNORE INTO services(service_name,slug) VALUES(?,?)")
      .bind(name, slug)
      .run();
    await db
      .prepare(
        "INSERT OR IGNORE INTO client_services(client_id,service_id) SELECT ?,id FROM services WHERE slug=?",
      )
      .bind(clientId, slug)
      .run();
  }
}
async function saveClient(db: D1Database, input: Record<string, unknown>, id?: number) {
  const v = validateClient(input);
  if (id) {
    await db
      .prepare(
        `UPDATE clients SET client_name=?,company_name=?,slug=?,nature_of_business=?,city=?,logo_alt_text=?,short_description=?,project_requirement=?,solution_provided=?,result_summary=?,testimonial=?,testimonial_person_name=?,testimonial_person_designation=?,website_url=?,display_order=?,is_featured=?,is_published=?,updated_at=CURRENT_TIMESTAMP WHERE id=?`,
      )
      .bind(
        v.clientName,
        v.companyName,
        v.slug,
        v.natureOfBusiness,
        v.city,
        v.logoAltText,
        v.shortDescription,
        v.projectRequirement,
        v.solutionProvided,
        v.resultSummary,
        v.testimonial,
        v.testimonialPersonName,
        v.testimonialPersonDesignation,
        v.websiteUrl,
        v.displayOrder,
        v.isFeatured,
        v.isPublished,
        id,
      )
      .run();
    await syncServices(db, id, v.services);
    return id;
  }
  const result = await db
    .prepare(
      `INSERT INTO clients(client_name,company_name,slug,nature_of_business,city,logo_alt_text,short_description,project_requirement,solution_provided,result_summary,testimonial,testimonial_person_name,testimonial_person_designation,website_url,display_order,is_featured,is_published) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) RETURNING id`,
    )
    .bind(
      v.clientName,
      v.companyName,
      v.slug,
      v.natureOfBusiness,
      v.city,
      v.logoAltText,
      v.shortDescription,
      v.projectRequirement,
      v.solutionProvided,
      v.resultSummary,
      v.testimonial,
      v.testimonialPersonName,
      v.testimonialPersonDesignation,
      v.websiteUrl,
      v.displayOrder,
      v.isFeatured,
      v.isPublished,
    )
    .first<{ id: number }>();
  if (!result) throw new Error("Client could not be created.");
  await syncServices(db, result.id, v.services);
  return result.id;
}
function safeSvg(value: string) {
  return !/<script|on\w+\s*=|javascript:|<!entity|<foreignObject/i.test(value);
}
function validImage(bytes: Uint8Array, type: string) {
  if (type === "image/png")
    return bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
  if (type === "image/jpeg") return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (type === "image/webp")
    return (
      String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" &&
      String.fromCharCode(...bytes.slice(8, 12)) === "WEBP"
    );
  return type === "image/svg+xml";
}

export async function handleClientApi(request: Request, rawEnv: unknown): Promise<Response | null> {
  const url = new URL(request.url);
  if (!url.pathname.startsWith("/api/")) return null;
  const env = (rawEnv || {}) as ClientEnv;
  if (url.pathname.startsWith("/api/client-logos/") && request.method === "GET") {
    const key = decodeURIComponent(url.pathname.slice(18));
    const object = await env.CLIENT_LOGOS?.get(key);
    if (!object) return new Response("Not found", { status: 404 });
    return new Response(object.body, {
      headers: {
        "content-type": object.httpMetadata?.contentType || "application/octet-stream",
        "cache-control": "public, max-age=31536000, immutable",
        "x-content-type-options": "nosniff",
      },
    });
  }
  const db = dbRequired(env);
  if (!db) return json({ error: "CLIENTS_DB binding is not configured." }, 503);
  if (url.pathname === "/api/clients" && request.method === "GET") {
    const rows = await db
      .prepare(
        `${selectClients} WHERE c.is_published=1 GROUP BY c.id ORDER BY c.display_order,c.company_name`,
      )
      .all();
    const privacy = await db
      .prepare(
        "SELECT setting_value FROM client_settings WHERE setting_key='show_client_name_publicly'",
      )
      .first<{ setting_value: string }>();
    const showClientName = privacy?.setting_value === "true";
    return json(
      { clients: (rows.results || []).map((row) => mapClient(row, showClientName)) },
      200,
      {
        "cache-control": "public, max-age=60",
      },
    );
  }
  if (url.pathname.startsWith("/api/clients/") && request.method === "GET") {
    const slug = decodeURIComponent(url.pathname.slice(13));
    const row = await db
      .prepare(`${selectClients} WHERE c.slug=? AND c.is_published=1 GROUP BY c.id`)
      .bind(slug)
      .first();
    return row ? json({ client: mapClient(row) }) : json({ error: "Client not found." }, 404);
  }
  if (url.pathname === "/api/admin/login" && request.method === "POST") {
    const input = (await request.json()) as { password?: string };
    if (!env.ADMIN_PASSWORD || !env.ADMIN_SESSION_SECRET)
      return json({ error: "Admin authentication is not configured." }, 503);
    if (input.password !== env.ADMIN_PASSWORD) return json({ error: "Invalid password." }, 401);
    const csrf = crypto.randomUUID();
    const session = await sessionCookie(env);
    const secure = url.protocol === "https:" ? "; Secure" : "";
    const headers = new Headers({ "content-type": "application/json" });
    headers.append(
      "set-cookie",
      `client_admin_session=${session}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800${secure}`,
    );
    headers.append(
      "set-cookie",
      `client_admin_csrf=${csrf}; SameSite=Strict; Path=/; Max-Age=28800${secure}`,
    );
    return new Response(JSON.stringify({ ok: true, csrf }), { headers });
  }
  if (!(await isAdmin(request, env))) return json({ error: "Authentication required." }, 401);
  if (!["GET", "HEAD"].includes(request.method) && !csrfValid(request))
    return json({ error: "Invalid CSRF token." }, 403);
  if (url.pathname === "/api/admin/session" && request.method === "GET")
    return json({ authenticated: true, csrf: parseCookies(request).client_admin_csrf });
  if (url.pathname === "/api/admin/logout" && request.method === "POST")
    return json({ ok: true }, 200, {
      "set-cookie": "client_admin_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0",
    });
  if (url.pathname === "/api/admin/clients" && request.method === "GET") {
    const rows = await db
      .prepare(`${selectClients} GROUP BY c.id ORDER BY c.display_order,c.company_name`)
      .all();
    return json({ clients: (rows.results || []).map((row) => mapClient(row, true)) });
  }
  if (url.pathname === "/api/admin/clients" && request.method === "POST") {
    try {
      const id = await saveClient(db, (await request.json()) as Record<string, unknown>);
      return json({ id }, 201);
    } catch (error) {
      return json({ error: error instanceof Error ? error.message : "Invalid client." }, 422);
    }
  }
  const clientMatch = url.pathname.match(/^\/api\/admin\/clients\/(\d+)$/);
  if (clientMatch) {
    const id = Number(clientMatch[1]);
    if (request.method === "PUT") {
      try {
        await saveClient(db, (await request.json()) as Record<string, unknown>, id);
        return json({ ok: true });
      } catch (error) {
        return json({ error: error instanceof Error ? error.message : "Invalid client." }, 422);
      }
    }
    if (request.method === "DELETE") {
      const row = await db
        .prepare("SELECT logo FROM clients WHERE id=?")
        .bind(id)
        .first<{ logo?: string }>();
      await db.prepare("DELETE FROM clients WHERE id=?").bind(id).run();
      if (row?.logo) await env.CLIENT_LOGOS?.delete(row.logo);
      return json({ ok: true });
    }
  }
  if (url.pathname === "/api/admin/clients/bulk" && request.method === "POST") {
    const body = (await request.json()) as { ids?: number[]; action?: string };
    const ids = (body.ids || []).map(Number).filter(Number.isFinite).slice(0, 200);
    if (!ids.length) return json({ error: "Select at least one client." }, 422);
    const marks = ids.map(() => "?").join(",");
    const updates: Record<string, string> = {
      publish: "is_published=1",
      unpublish: "is_published=0",
      feature: "is_featured=1",
      unfeature: "is_featured=0",
    };
    if (body.action === "delete")
      await db
        .prepare(`DELETE FROM clients WHERE id IN (${marks})`)
        .bind(...ids)
        .run();
    else if (body.action && updates[body.action])
      await db
        .prepare(
          `UPDATE clients SET ${updates[body.action]},updated_at=CURRENT_TIMESTAMP WHERE id IN (${marks})`,
        )
        .bind(...ids)
        .run();
    else return json({ error: "Invalid bulk action." }, 422);
    return json({ ok: true, affected: ids.length });
  }
  if (url.pathname === "/api/admin/import" && request.method === "POST") {
    const body = (await request.json()) as {
      rows?: Record<string, unknown>[];
      duplicateMode?: string;
      fileName?: string;
    };
    const report = {
      total: body.rows?.length || 0,
      imported: 0,
      updated: 0,
      duplicates: 0,
      invalid: 0,
      failed: 0,
      errors: [] as Array<{ row: number; reason: string }>,
    };
    for (const [index, row] of (body.rows || []).slice(0, 2000).entries()) {
      try {
        const v = validateClient(row);
        const existing = await db
          .prepare(
            "SELECT id FROM clients WHERE lower(company_name)=lower(?) AND lower(city)=lower(?)",
          )
          .bind(v.companyName, v.city)
          .first<{ id: number }>();
        if (existing && body.duplicateMode !== "update" && body.duplicateMode !== "new") {
          report.duplicates++;
          continue;
        }
        if (existing && body.duplicateMode === "update") {
          await saveClient(db, row, existing.id);
          report.updated++;
        } else {
          if (existing && body.duplicateMode === "new")
            row.slug = `${v.slug}-${crypto.randomUUID().slice(0, 8)}`;
          await saveClient(db, row);
          report.imported++;
        }
      } catch (error) {
        report.invalid++;
        report.errors.push({
          row: index + 2,
          reason: error instanceof Error ? error.message : "Invalid row",
        });
      }
    }
    await db
      .prepare(
        "INSERT INTO client_imports(file_name,total_rows,imported_rows,updated_rows,duplicate_rows,invalid_rows,failed_rows) VALUES(?,?,?,?,?,?,?)",
      )
      .bind(
        text(body.fileName) || "import",
        report.total,
        report.imported,
        report.updated,
        report.duplicates,
        report.invalid,
        report.failed,
      )
      .run();
    return json(report);
  }
  if (url.pathname.match(/^\/api\/admin\/clients\/\d+\/logo$/) && request.method === "POST") {
    if (!env.CLIENT_LOGOS) return json({ error: "CLIENT_LOGOS binding is not configured." }, 503);
    const id = Number(url.pathname.split("/")[4]);
    const form = await request.formData();
    const file = form.get("logo");
    if (!(file instanceof File)) return json({ error: "Choose a logo file." }, 422);
    if (file.size > 2 * 1024 * 1024) return json({ error: "Logo must be 2 MB or smaller." }, 422);
    const allowed = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];
    if (!allowed.includes(file.type))
      return json({ error: "PNG, JPG, WEBP and SVG files are supported." }, 422);
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    if (!validImage(bytes, file.type))
      return json({ error: "File content does not match its image type." }, 422);
    if (file.type === "image/svg+xml" && !safeSvg(new TextDecoder().decode(buffer)))
      return json({ error: "Unsafe SVG content was rejected." }, 422);
    const extension: Record<string, string> = {
      "image/png": "png",
      "image/jpeg": "jpg",
      "image/webp": "webp",
      "image/svg+xml": "svg",
    };
    const key = `clients/${id}/${crypto.randomUUID()}.${extension[file.type]}`;
    const old = await db
      .prepare("SELECT logo FROM clients WHERE id=?")
      .bind(id)
      .first<{ logo?: string }>();
    await env.CLIENT_LOGOS.put(key, buffer, { httpMetadata: { contentType: file.type } });
    await db
      .prepare("UPDATE clients SET logo=?,updated_at=CURRENT_TIMESTAMP WHERE id=?")
      .bind(key, id)
      .run();
    if (old?.logo) await env.CLIENT_LOGOS.delete(old.logo);
    return json({ logo: `/api/client-logos/${key}` });
  }
  if (url.pathname.match(/^\/api\/admin\/clients\/\d+\/logo$/) && request.method === "DELETE") {
    const id = Number(url.pathname.split("/")[4]);
    const old = await db
      .prepare("SELECT logo FROM clients WHERE id=?")
      .bind(id)
      .first<{ logo?: string }>();
    await db
      .prepare("UPDATE clients SET logo=NULL,updated_at=CURRENT_TIMESTAMP WHERE id=?")
      .bind(id)
      .run();
    if (old?.logo) await env.CLIENT_LOGOS?.delete(old.logo);
    return json({ ok: true });
  }
  if (url.pathname === "/api/admin/settings" && request.method === "GET") {
    const rows = await db
      .prepare("SELECT setting_key,setting_value FROM client_settings")
      .all<{ setting_key: string; setting_value: string }>();
    return json({
      settings: Object.fromEntries(
        (rows.results || []).map((row) => [row.setting_key, row.setting_value]),
      ),
    });
  }
  if (url.pathname === "/api/admin/settings" && request.method === "PUT") {
    const body = (await request.json()) as { showClientNamePublicly?: boolean };
    await db
      .prepare(
        "INSERT INTO client_settings(setting_key,setting_value,updated_at) VALUES('show_client_name_publicly',?,CURRENT_TIMESTAMP) ON CONFLICT(setting_key) DO UPDATE SET setting_value=excluded.setting_value,updated_at=CURRENT_TIMESTAMP",
      )
      .bind(body.showClientNamePublicly ? "true" : "false")
      .run();
    return json({ ok: true });
  }
  if (url.pathname === "/api/admin/services" && request.method === "GET") {
    const rows = await db.prepare("SELECT * FROM services ORDER BY service_name").all();
    return json({ services: rows.results || [] });
  }
  if (url.pathname === "/api/admin/services" && request.method === "POST") {
    const body = (await request.json()) as { name?: string };
    const name = text(body.name);
    if (!name) return json({ error: "Service name is required." }, 422);
    await db
      .prepare("INSERT OR IGNORE INTO services(service_name,slug) VALUES(?,?)")
      .bind(name, slugify(name))
      .run();
    return json({ ok: true }, 201);
  }
  return json({ error: "API route not found." }, 404);
}
