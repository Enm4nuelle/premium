import EmblaCarrousel from "./emblaCarrousel";
import React from "react";

export const CarrouselPortraits = (props) => {
    const itemsCarousel = props.data.portraits.map((testim, index) => (
        <div
            className="carrouselPortraits-portrait-item"
            key={testim.altImg + index}
            style={{
                borderColor: props.data.borderColor ?? "",
                backgroundColor: props.data.borderColor ?? "",
                height: props.data.heightItem ? (props.data.heightItem + "px") : undefined,
                minHeight: props.data.heightItem ? (props.data.heightItem + "px") : undefined,
            }}
        >
            <div className="carrouselPortraits-portrait-item-img-container">
                <img
                    className="carrouselPortraits-portrait-item-img"
                    alt={testim.altImg ?? ("Foto de testimonio de " + testim.title)}
                    src={testim.img}
                    loading="lazy"
                />
            </div>
        </div>
    ));
    return (
        <section
            className={"carrouselPortraits " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}
            id={props.data.nameId}
        >
            <div className="carrouselPortraits-portraits">
                {
                    <EmblaCarrousel
                        slidesToShow = {props.data.slidesToShow}
                        componentFather = {"carrouselPortraits"}
                        loop = {props.data.loop}
                        autoplay = {props.data.autoplay}
                        delayAutoPlay = {props.data.delayAutoPlay}
                        iconButtonPrev = {props.iconButtonPrev}
                        iconButtonNext = {props.iconButtonNext}
                        alignStart = {props.data.alignStart}
                        buttonAtSides = {props.data.buttonAtSides}
                        dontShowButtons = {props.data.dontShowButtons}
                    >
                        {itemsCarousel}
                    </EmblaCarrousel>
                }
            </div>
        </section>
    )
}
export default CarrouselPortraits;