"use client";

import React from "react";
import ScrollAnimation from "./scrollAnimation";
import { useState, useEffect } from "react";
import { usePackage } from "@/context/PackageContext";

export const OptionsImgWithText = (props) => {
    const { packageInfo } = usePackage();
    //comprobamos si viene desde la página de detalle producto y jalamos esa info
    const { idPackage } = packageInfo;
    console.log(idPackage);
    const [idShow, setIdShow] = useState(idPackage ?? props.data.defaultIdShow ?? 1);

    useEffect(() => {
        const currentOption = props.data.options.find(o => o.idPackage === idShow);
        if (!currentOption){
            return;
        }
        const element = document.getElementById(currentOption.title + currentOption.idPackage);
        if (!element) {
            return;
        }
        element.classList.remove("optionsImgWithText-hero-animation");
        void element.offsetWidth; // fuerza el reflow para reiniciar la animación
        element.classList.add("optionsImgWithText-hero-animation");
    }, [idShow]);

    return (
        <section className={"optionsImgWithText " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
            <ScrollAnimation animation={props.data.typeAnimationHeader} pixelsDisplacement={props.data.pixelsAnimationHeader} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader}>
                <div className="optionsImgWithText-header">
                    {
                        props.data.isMainH1 ?
                        <h1 className="optionsImgWithText-header-title">{props.data.title}</h1>
                        :
                        <h2 className="optionsImgWithText-header-title">{props.data.title}</h2>
                    }
                    <div className="optionsImgWithText-header-divider" aria-hidden="true"></div>
                </div>
            </ScrollAnimation>
            <ul className="optionsImgWithText-buttons">
                {
                    props.data.options.map((option, index) => (
                        <ScrollAnimation animation={props.data.typeAnimationButtons} pixelsDisplacement={props.data.pixelsAnimationButtons} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader} key={option.title + index}>
                            <button
                                className={"optionsImgWithText-buttons-button " + (option.idPackage === idShow ? "is-active" : "")}
                                onClick={()=>{setIdShow(option.idPackage)}}
                                style={{
                                    "--bg": option.backgroundColor ?? undefined,
                                    color: option.color ?? undefined,
                                    border: option.borderColor ? ("2px solid " + option.borderColor) : undefined,
                                    "--hover-bg": option.backgroundHoverColor ?? option.backgroundColor ?? undefined
                                }}
                            >
                                {option.buttonText}
                            </button>
                        </ScrollAnimation>
                    ))
                }
            </ul>
            <ul className="optionsImgWithText-hero-container">
                {
                    props.data.options.map((option, index)=>(
                        <div
                            className={"optionsImgWithText-hero " + (idShow === option.idPackage ? "" : "sr-only")}
                            key={"Hero " + option.title + index}
                            id={option.title + option.idPackage}
                        >
                            <img
                                className="optionsImgWithText-hero-img"
                                src={option.img}
                                alt={option.altImg ?? "Hero del Paquete"}
                            />
                            <div className="optionsImgWithText-hero-text">
                                {
                                    props.data.isMainH1 ?
                                    <h2 className="optionsImgWithText-hero-text-title">{option.title}</h2>
                                    :
                                    <h3 className="optionsImgWithText-hero-text-title">{option.title}</h3>
                                }
                                <p className="optionsImgWithText-hero-text-description">{option.description}</p>
                            </div>
                        </div>
                    ))
                }
            </ul>
        </section>
    )
}
export default OptionsImgWithText;