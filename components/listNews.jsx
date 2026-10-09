import Link from "next/link";

export const ListNews = (props) => {
    return (
        <section className={"listNews " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
            <div className="listNews-header">
                {
                    props.data.isMainH1 ?
                    <h1 className="listNews-header-title">{props.data.title}</h1>
                    :
                    <h2 className="listNews-header-title">{props.data.title}</h2>
                }
                <div className="listNews-header-divider"></div>
                <p className="listNews-header-description">{props.data.description}</p>
            </div>
            <ul className="listNews-news">
                {
                    props.data.news.map((item, index)=>(
                        <Link key={item.title + index} href={props.data.href + "/" + item.slug}>
                            <li className="listNews-news-new">
                                <div className="listNews-news-new-info">
                                    {
                                        props.data.isMainH1 ?
                                        <h2 className="listNews-news-new-info-title">{item.title}</h2>
                                        :
                                        <h3 className="listNews-news-new-info-title">{item.title}</h3>
                                    }
                                    <p className="listNews-news-new-info-description">{item.description}</p>
                                    <p className="listNews-news-new-info-author">{item.author}</p>
                                </div>
                                <img
                                    className="listNews-news-new-img"
                                    src={item.img}
                                    alt={item.altImg ?? item.title}
                                />
                            </li>
                        </Link>
                    ))
                }
            </ul>
        </section>
    )
}
export default ListNews;