import JsonData from "../../data/data.json";
import Header from '@/components/header';
import Footer from "@/components/footer";
import FloatingWhatsapp from "@/components/floatingWhatsapp";

export const metadata = {
    metadataBase: new URL(JsonData.urlDomain),
    title: {
        default: "Inicio | Premium Events",
        template: "%s | Premium Events",
    },
    description: "Premium Events organiza tours de 2 a 4 días en Tarapoto: Lamas, Laguna Azul, Alto Mayo y cataratas de Ahuashiyacu. Recojo del hotel, guía y movilidad incluidos.",
    keywords: [
        "tours en Tarapoto",
        "paquetes turísticos Tarapoto",
        "tour Laguna Azul",
        "tour Lamas",
        "tour Moyobamba Alto Mayo",
        "catarata Ahuashiyacu",
        "turismo San Martín",
        "Premium Events",
    ],
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Premium Events | Tours en Tarapoto",
        description: "Vive Tarapoto con tours de 2 a 4 días: cascadas, lagunas, aguas termales y cultura nativa, con recojo del hotel y guía incluidos.",
        url: JsonData.urlDomain,
        siteName: "Premium Events",
        images: [
            {
                url: JsonData.ogImage,
                width: 1200,
                height: 630,
                alt: "Premium Events - Tours en Tarapoto",
            },
        ],
        locale: "es_PE",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Premium Events | Tours en Tarapoto",
        description: "Vive Tarapoto con tours de 2 a 4 días: cascadas, lagunas, aguas termales y cultura nativa, con recojo del hotel y guía incluidos.",
        images: [JsonData.ogImage],
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: "favicon.ico"
    },
};

export default function MainLayout({ children }) {
    const header = JsonData.forAllPages.find(item => item.pageName === "Header");
    const floatingWhatsapp = JsonData.forAllPages.find(item => item.pageName === "FloatingWhatsapp");
    const footer = JsonData.forAllPages.find(item => item.pageName === "Footer");

    const loc = JsonData.locationCompany;
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        "@id": `${JsonData.urlDomain}#agency`,
        "name": "Premium Events",
        "image": `${JsonData.urlDomain}${JsonData.ogImage.slice(1)}`,
        "url": JsonData.urlDomain,
        "logo": `${JsonData.urlDomain}img/imagenesInicio/logo.webp`,
        "description": "Premium Events: empresa de tours en Tarapoto con paquetes de 2 a 4 días que incluyen Lamas, Laguna Azul, Alto Mayo y Ahuashiyacu, con recojo del hotel, movilidad turística y guía.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": loc.streetAddress,
            "addressLocality": loc.addressLocality,
            "addressRegion": loc.addressRegion,
            "postalCode": loc.postalCode,
            "addressCountry": loc.addressCountry,
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": loc.latitude,
            "longitude": loc.longitude,
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": footer.data.contacts.find(c => c.type === "phone")?.items[0].text,
            "email": footer.data.contacts.find(c => c.type === "email")?.text,
            "contactType": "sales",
            "areaServed": "PE",
            "availableLanguage": ["Spanish"],
        },
        "sameAs": footer.data.socialNetworks.map(s => s.href),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Header data={header.data} />
            <main>
                {children}
            </main>
            <FloatingWhatsapp data={floatingWhatsapp.data} />
            <Footer data={footer.data} />
        </>
    );
}