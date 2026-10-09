"use client";

import NewsJson from "@/data/news.json";
import { usePathname } from "next/navigation";

export const DetailNews = (props) => {
    const pathname = usePathname();
    let auxPathname = pathname.split("/")[2];
    const newInfo = NewsJson.noticias.find((n) => n.slug === auxPathname);
    if(!newInfo){
        return;
    }
    return (
        <section className={"detailNews " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
            <div className="detailNews-header">
                {
                    props.data.isMainH1 ?
                    <h1 className="detailNews-header-title">{newInfo.title}</h1>
                    :
                    <h2 className="detailNews-header-title">{newInfo.title}</h2>
                }
                <p className="detailNews-header-subTitle">{newInfo.subTitle}</p>
                <p className="detailNews-header-author">
                    <span>{props.data.labelAuthor}</span>
                    {newInfo.author}
                </p>
                <p className="detailNews-header-dates">
                    {props.data.labelDatePublication}{newInfo.publicationDateLabel} | {props.data.labelDateActualization}{newInfo.actualizationDateLabel}
                </p>
                <div className="detailNews-header-img-container">
                    <img
                        src={newInfo.imgPortrait}
                        alt={newInfo.altImgPortrait ?? newInfo.title}
                        className="detailNews-header-img"
                    />
                </div>
            </div>
            <article className="detailNews-firstParagraph">
                {newInfo.parragraphIntro.firstPart}
                <span>{newInfo.parragraphIntro.highlightedPart}</span> 
                {newInfo.parragraphIntro.secondPart}
            </article>
            <ul className="detailNews-paragraphs">
                {
                    newInfo.sections.map((item, index)=>(
                        <li className="detailNews-paragraphs-section" key={item.title + index}>
                            {
                                props.data.isMainH1 ?
                                <h2 className="detailNews-paragraphs-section-title">{item.title}</h2>
                                :
                                <h3 className="detailNews-paragraphs-section-title">{item.title}</h3>
                            }
                            <div className="detailNews-paragraphs-section-parrafs">
                                {
                                    item.parragraphs.map((parraf, indexJ)=>(
                                        <div key={indexJ} className="detailNews-paragraphs-section-parrafs-parraf">
                                            <article className="detailNews-paragraphs-section-parrafs-parraf-text">
                                                {parraf.firstPart}
                                                <span>{parraf.highlightedPart}</span> 
                                                {parraf.secondPart}
                                            </article>
                                            {
                                                parraf.img ?
                                                <div className="detailNews-header-img-container">
                                                    <img
                                                        className="detailNews-header-img"
                                                        src={parraf.img}
                                                        alt={parraf.altImg ?? "Imagen Noticia"}
                                                    />
                                                </div>
                                                :
                                                ""
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}
export default DetailNews;