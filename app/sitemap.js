import JsonData from "../data/data.json";

export default function sitemap() {
    const today = new Date().toISOString();
    const baseUrl = JsonData.urlDomain.replace(/\/$/, "");
    let pagesActive = [];

    pagesActive.push({
        url: JsonData.urlDomain,
        lastModified: today,
        changeFrequency: "weekly",
        priority: 1,
    });
    pagesActive.push({
        url: JsonData.urlDomain,
        lastModified: today,
        changeFrequency: "weekly",
        priority: 1,
    });
    pagesActive.push({
        url: `${JsonData.urlDomain}arma-tu-plan`,
        lastModified: today,
        changeFrequency: "weekly",
        priority: 1,
    });
    return pagesActive;
}