import ScrollAnimation from "./scrollAnimation";

export const CardsPlans = (props) => {
    const intervalAnimationItem = props.data.delayEachItemAnimation ?? 0;
    let delayAnimationItems = [];
    if(props.data.plans){
        for(let i = 0; i < props.data.plans.length; i++){
            delayAnimationItems.push(intervalAnimationItem * (i + 1));
        }
    }
    return (
        <section
            className={"cardsPlans " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}
            id={props.data.nameId ?? ""}
        >
            <ScrollAnimation animation={props.data.typeAnimationHeader} pixelsDisplacement={props.data.pixelsAnimationHeader} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader}>
                <div className="cardsPlans-header">
                    <p className="cardsPlans-header-subTitle">{props.data.subTitle}</p>
                    {
                        props.data.isMainH1 ?
                        <h1 className="cardsPlans-header-title">{props.data.title}</h1>
                        :
                        <h2 className="cardsPlans-header-title">{props.data.title}</h2>
                    }
                    <div className="cardsPlans-header-divider" aria-hidden="true"></div>
                </div>
            </ScrollAnimation>
            <ul className="cardsPlans-plans">
                {
                    props.data.plans.map((plan, index) => (
                        <ScrollAnimation animation={plan.typeAnimation} pixelsDisplacement={plan.pixelsAnimation} duration={props.data.durationAnimationItems} delay={props.data.delayEachItemAnimation} key={plan.title + index}>
                            <li className={"cardsPlans-plans-plan " + ((index + 1) === props.data.plans.length ? " cardsPlans-plans-lastPlan" : "")}>
                                {
                                    props.data.isMainH1 ?
                                    <h2 className="cardsPlans-plans-plan-title">{plan.title}</h2>
                                    :
                                    <h3 className="cardsPlans-plans-plan-title">{plan.title}</h3>
                                }
                                <p className="cardsPlans-plans-plan-description">{plan.description}</p>
                                <div className="cardsPlans-plans-plan-features">
                                    {
                                        plan.features.map((feat, indexJ) => (
                                            <p className="cardsPlans-plans-plan-features-feat" key={feat.text + index + indexJ}>
                                                <i className={
                                                        "cardsPlans-plans-plan-features-feat-icon " +
                                                        (feat.included ? props.data.iconIncludes : props.data.iconNoIncludes) + " " +
                                                        (feat.included ? "cardsPlans-plans-plan-features-feat-icon-included" : "cardsPlans-plans-plan-features-feat-icon-noIncluded")
                                                    }
                                                ></i>
                                                {feat.text}
                                            </p>
                                        ))
                                    }
                                </div>
                                <div className="cardsPlans-plans-plan-prices">
                                    {
                                        plan.prices.map((price, indexJ) => (
                                            <div className="cardsPlans-plans-plan-prices-price" key={price.reasonPrice + index + indexJ}>
                                                <p className="cardsPlans-plans-plan-prices-price-reasonPrice">
                                                    {price.reasonPrice}
                                                </p>
                                                <p className="cardsPlans-plans-plan-prices-price-amount">
                                                    {price.amount}
                                                </p>
                                            </div>
                                        ))
                                    }
                                </div>
                                <a
                                    className={
                                        "cardsPlans-plans-plan-buttonContact " +
                                        (props.data.buttonContact.type === "primary" ? "buttonPrimary" : "buttonSecondary")
                                    }
                                    href={`https://wa.me/${props.data.buttonContact.numbers[index]}?text=${encodeURIComponent(props.data.buttonContact.defaultMessage + plan.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Contáctanos por WhatsApp"
                                >
                                    {props.data.buttonContact.text}
                                    <i className={"cardsPlans-plans-plan-buttonContact-icon " + props.data.buttonContact.icon}></i>
                                </a>
                            </li>
                        </ScrollAnimation>
                    ))
                }
            </ul>
        </section>
    )
}
export default CardsPlans;