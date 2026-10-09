import JsonData from "../../../data/data.json";
import BuildPlan from "@/components/buildPlan";

export const metadata = {
    title: "Arma tu Plan",
    description: "Premium te permite armar tu plan para visitar los sitios turísticos que prefieras, solo escoge los lugares que más te interesan",
    alternates: {
        canonical: "/arma-tu-plan",
    },
    openGraph: {
        title: "Arma tu Plan | Premium",
        description: "Premium te permite armar tu plan para visitar los sitios turísticos que prefieras, solo escoge los lugares que más te interesan.",
        url: `${JsonData.urlDomain}arma-tu-plan`,
        images: [JsonData.ogImage],
        locale: "es_PE",
        type: "website",
    },
};

export const Promociones = () => {
    const pages = [];
    for (const page of JsonData.pagesArmarPlan) {
        if (page.pageName === "BuildPlan"){
            pages.push({e: <BuildPlan data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }
    }
    pages.sort((a, b) => a.order - b.order);
    return (
        <div>
            {pages.map((p) => p.e)}
        </div>
    )
}
export default Promociones;