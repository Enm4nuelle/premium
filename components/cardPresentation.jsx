"use client";

import CompanyClientsJson from "@/data/companyClients.json";
import { usePathname } from "next/navigation";

export const CardPresentation = (props) => {
    const pathname = usePathname();
    let auxPathname = pathname.split("/")[1];
    const infoClient = CompanyClientsJson.clientsInfo.find((c) => c.slug === auxPathname);
    if(!infoClient){
        return;
    }
    return (
        <section
            className={"cardPresentation " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}
            style={{
                "--color-primary": infoClient.colorPrimary,
                "--color-secondary": infoClient.colorSecondary
            }}
        >
            <div className="cardPresentation-logo-container">
                <img
                    className="cardPresentation-logo"
                    src={infoClient.logo}
                    alt={infoClient.altLogo ?? ("Logo de " + infoClient.nameCompany)}
                />
                {
                    props.data.isMainH1 ?
                    <h1 className="cardPresentation-nameCompany">{infoClient.nameCompany}</h1>
                    :
                    <h2 className="cardPresentation-nameCompany">{infoClient.nameCompany}</h2>
                }
                <div className="cardPresentation-waves" aria-hidden="true">
                    <svg viewBox="0 0 500 200" preserveAspectRatio="none">
                        {/* Franja de color principal */}
                        <path
                            className="cardPresentation-wave-color"
                            d="M0,10 C90,125 300,170 500,30 L500,200 L0,200 Z"
                        />
                        {/* Franja intermedia más oscura (subida) */}
                        <path
                            className="cardPresentation-wave-color cardPresentation-wave-dark"
                            d="M0,40 C110,150 320,185 500,65 L500,200 L0,200 Z"
                        />
                        {/* Blanco al frente (igual que antes) */}
                        <path
                            className="cardPresentation-wave-white"
                            d="M0,90 C130,185 340,205 500,85 L500,200 L0,200 Z"
                        />
                    </svg>
                </div>
            </div>
            <div className="cardPresentation-info">
                <div className="cardPresentation-info-person">
                    <div className="cardPresentation-info-person-decoration" aria-hidden="true"></div>
                    {
                        props.data.isMainH1 ?
                        <h2 className="cardPresentation-info-person-text">
                            <span>{infoClient.firstName}</span>
                            {infoClient.lastName}
                        </h2>
                        :
                        <h3 className="cardPresentation-info-person-text">
                            <span>{infoClient.firstName}</span>
                            {infoClient.lastName}
                        </h3>
                    }
                    <p className="cardPresentation-info-person-position">{infoClient.positionPerson}</p>
                </div>
                <ul className="cardPresentation-info-contacts">
                    <li className="cardPresentation-info-contacts-item">
                        <i
                            className={"cardPresentation-info-contacts-item-icon " + props.data.iconEmail}
                            style={{
                                backgroundColor: infoClient.colorPrimary
                            }}
                        ></i>
                        <a
                            className="cardPresentation-info-contacts-item-text"
                            href={"mailto:" + infoClient.email}
                        >
                            {infoClient.email}
                        </a>
                    </li>
                    <li className="cardPresentation-info-contacts-item">
                        <i
                            className={"cardPresentation-info-contacts-item-icon " + props.data.iconPhone}
                            style={{
                                backgroundColor: infoClient.colorSecondary
                            }}
                        ></i>
                        <a
                            className="cardPresentation-info-contacts-item-text"
                            href={"tel:" + infoClient.phone.replace(/\s/g, "")}
                        >
                            {infoClient.phone}
                        </a>
                    </li>
                    {
                        infoClient.website ?
                        <li className="cardPresentation-info-contacts-item">
                            <i
                                className={"cardPresentation-info-contacts-item-icon " + props.data.iconWebsite}
                                style={{
                                    backgroundColor: infoClient.colorPrimary
                                }}
                            ></i>
                            <a
                                className="cardPresentation-info-contacts-item-text cardPresentation-info-contacts-item-website"
                                href={"https://" + infoClient.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Ir a página web"
                            >
                                {infoClient.website}
                            </a>
                        </li>
                        :
                        ""
                    }
                </ul>
            </div>
        </section>
    )
}
export default CardPresentation;