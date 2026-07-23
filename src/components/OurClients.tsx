import { SectionHeading } from "@/components/SectionHeading";
import apexIndustries from "@/assets/client-logos/apex-industries.svg";
import greenleafAgro from "@/assets/client-logos/greenleaf-agro.svg";
import horizonFoundation from "@/assets/client-logos/horizon-foundation.svg";
import novaEnterprises from "@/assets/client-logos/nova-enterprises.svg";
import unityAssociates from "@/assets/client-logos/unity-associates.svg";
import brightpathSolutions from "@/assets/client-logos/brightpath-solutions.svg";
import shreeVentures from "@/assets/client-logos/shree-ventures.svg";
import urbanedgeGroup from "@/assets/client-logos/urbanedge-group.svg";
import primeworks from "@/assets/client-logos/primeworks.svg";
import growthsphere from "@/assets/client-logos/growthsphere.svg";

const CLIENT_LOGOS = [
  { name: "Apex Industries", src: apexIndustries },
  { name: "GreenLeaf Agro", src: greenleafAgro },
  { name: "Horizon Foundation", src: horizonFoundation },
  { name: "Nova Enterprises", src: novaEnterprises },
  { name: "Unity Associates", src: unityAssociates },
  { name: "BrightPath Solutions", src: brightpathSolutions },
  { name: "Shree Ventures", src: shreeVentures },
  { name: "UrbanEdge Group", src: urbanedgeGroup },
  { name: "PrimeWorks", src: primeworks },
  { name: "GrowthSphere", src: growthsphere },
];

export function OurClients() {
  const marqueeItems = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section className="overflow-hidden bg-surface py-20" aria-labelledby="our-clients-title">
      <div className="container-x">
        <SectionHeading
          eyebrow="Trusted By"
          title={<span id="our-clients-title">Our Clients</span>}
          description="We are proud to support businesses, startups, NGOs and organizations with reliable registration, compliance and consultancy services."
        />
      </div>
      <div className="mt-12 overflow-hidden">
        <div className="client-marquee flex w-max gap-5 px-5" aria-label="Client logo carousel">
          {marqueeItems.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="grid h-24 w-[220px] shrink-0 place-items-center rounded-2xl border border-border bg-white p-4 shadow-sm transition hover:border-orange/40 sm:w-[260px]"
            >
              <img
                src={client.src}
                alt={`${client.name} logo`}
                className="h-full w-full object-contain opacity-55 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}