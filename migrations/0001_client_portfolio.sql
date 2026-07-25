PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_name TEXT,
  company_name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  nature_of_business TEXT NOT NULL,
  city TEXT NOT NULL,
  logo TEXT,
  logo_alt_text TEXT,
  short_description TEXT,
  project_requirement TEXT,
  solution_provided TEXT,
  result_summary TEXT,
  testimonial TEXT,
  testimonial_person_name TEXT,
  testimonial_person_designation TEXT,
  website_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_featured INTEGER NOT NULL DEFAULT 0 CHECK (is_featured IN (0, 1)),
  is_published INTEGER NOT NULL DEFAULT 1 CHECK (is_published IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS clients_company_city_unique ON clients (lower(company_name), lower(city));
CREATE INDEX IF NOT EXISTS clients_public_order_idx ON clients (is_published, display_order, company_name);
CREATE INDEX IF NOT EXISTS clients_featured_idx ON clients (is_published, is_featured, display_order);
CREATE INDEX IF NOT EXISTS clients_city_idx ON clients (city);
CREATE INDEX IF NOT EXISTS clients_business_idx ON clients (nature_of_business);

CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  service_name TEXT NOT NULL COLLATE NOCASE UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS client_services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  service_id INTEGER NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  UNIQUE (client_id, service_id)
);
CREATE INDEX IF NOT EXISTS client_services_client_idx ON client_services (client_id);
CREATE INDEX IF NOT EXISTS client_services_service_idx ON client_services (service_id);

CREATE TABLE IF NOT EXISTS client_settings (
  setting_key TEXT PRIMARY KEY,
  setting_value TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT OR IGNORE INTO client_settings (setting_key, setting_value) VALUES ('show_client_name_publicly', 'false');

CREATE TABLE IF NOT EXISTS client_imports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  file_name TEXT NOT NULL,
  total_rows INTEGER NOT NULL DEFAULT 0,
  imported_rows INTEGER NOT NULL DEFAULT 0,
  updated_rows INTEGER NOT NULL DEFAULT 0,
  duplicate_rows INTEGER NOT NULL DEFAULT 0,
  invalid_rows INTEGER NOT NULL DEFAULT 0,
  failed_rows INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);