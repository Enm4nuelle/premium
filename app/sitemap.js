import JsonData from "../data/data.json";

export default function sitemap() {
    const today = new Date().toISOString();
    const baseUrl = JsonData.urlDomain.replace(/\/$/, "");
    let pagesActive = [];

    pagesActive.unshift({
        url: JsonData.urlDomain,
        lastModified: today,
        changeFrequency: "weekly",
        priority: 1,
    });
    return pagesActive;
}