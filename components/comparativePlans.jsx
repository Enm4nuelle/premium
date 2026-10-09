"use client";

import ScrollAnimation from "./scrollAnimation";
import React from "react";
import { useState, useLayoutEffect, useRef } from "react";

export const ComparativePlans = (props) => {
    const [collapsedGroups, setCollapsedGroups] = useState([]);
    const [heights, setHeights] = useState({});
    const groupRefs = useRef({});

    useLayoutEffect(() => {
        const measureHeights = () => {
            const newHeights = {};
            props.data.groups.forEach(group => {
                const el = groupRefs.current[group.nameGroup];
                if (el) newHeights[group.nameGroup] = el.scrollHeight;
            });
            setHeights(newHeights);
        };

        measureHeights();

        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(measureHeights, 150);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(resizeTimeout);
        };
    }, [props.data.groups]);

    const hideFeatures = (nameGroup) => {
        setCollapsedGroups(prev =>
            prev.includes(nameGroup)
                ? prev.filter(g => g !== nameGroup)
                : [...prev, nameGroup]
        );
    };
    return (
        <section className={"comparativePlans " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
            <ScrollAnimation animation={props.data.typeAnimationHeader} pixelsDisplacement={props.data.pixelsAnimationHeader} duration={props.data.durationAnimationHeader} delay={props.data.delayAnimationHeader}>
                <div className="comparativePlans-header">
                    <h2 className="comparativePlans-header-title">{props.data.title}</h2>
                    <div className="comparativePlans-header-divider" aria-hidden="true"></div>
                </div>
            </ScrollAnimation>
            <div className="comparativePlans-plans-container">
                <div className="comparativePlans-plans-group-features-container comparativePlans-plans-title-container">
                    <p className="comparativePlans-plans-group-features-featLabel comparativePlans-plans-blankSpace">
                        {" "}
                    </p>
                    {
                        props.data.plans.map((plan, index) => (
                            <h3
                                key={plan.namePlan + index}
                                className="comparativePlans-plans-group-features-feat comparativePlans-plans-title"
                                style={{
                                    color: plan.color ?? undefined
                                }}
                            >
                                {plan.namePlan}
                            </h3>
                        ))
                    }
                </div>
                {
                    props.data.groups.map((group, index) => {
                        const isCollapsed = collapsedGroups.includes(group.nameGroup);
                        return(
                        <React.Fragment key={group.nameGroup + index}>
                            <div className="comparativePlans-plans-group">
                                <h3 className="comparativePlans-plans-group-text">
                                    {group.nameGroup}
                                    <i
                                        className={
                                            "comparativePlans-plans-group-icon " +
                                            (props.data.iconDropUp ?? "fa fa-solid fa-chevron-up") +
                                            (isCollapsed ? " comparativePlans-plans-group-icon-collapsed" : "")
                                        }
                                        onClick={() => hideFeatures(group.nameGroup)}
                                    ></i>
                                </h3>
                                <div
                                    className="comparativePlans-plans-group-features"
                                    ref={el => { groupRefs.current[group.nameGroup] = el; }}
                                    style={{
                                        maxHeight: isCollapsed ? "0px" : (heights[group.nameGroup] ?? "none"),
                                        overflow: "hidden",
                                        transition: "max-height 0.3s ease"
                                    }}
                                >
                                    {
                                        group.features.map((feat, indexJ) => (
                                            <React.Fragment key={feat.nameFeature + index + indexJ}>
                                                <div className="comparativePlans-plans-group-features-container">
                                                    <h4 className="comparativePlans-plans-group-features-featLabel">
                                                        {feat.nameFeature}
                                                    </h4>
                                                    <div className="comparativePlans-plans-group-features-feats-container">
                                                        {
                                                            feat.state.map((stat, indexK) => (
                                                                <p
                                                                    key={feat.nameFeature + index + indexJ + indexK}
                                                                    className="comparativePlans-plans-group-features-feat"
                                                                >
                                                                    {
                                                                        stat.text ?
                                                                            stat.text
                                                                        :
                                                                        <i
                                                                            className={
                                                                                stat.haveIt ?
                                                                                ("comparativePlans-plans-group-features-feat-iconHaveIt " +
                                                                                (props.data.iconHave ?? "fa fa-regular fa-circle-check")) :
                                                                                ("comparativePlans-plans-group-features-feat-iconDontHaveIt " +
                                                                                (props.data.iconDontHave ?? "fa fa-regular fa-circle-xmark"))
                                                                            }
                                                                        ></i>
                                                                    }
                                                                </p>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                                <div className="comparativePlans-plans-group-features-divider"></div>
                                            </React.Fragment>
                                        ))
                                    }
                                </div>
                                <div className="comparativePlans-plans-group-divider"></div>
                            </div>
                        </React.Fragment>)
                    })
                }
            </div>
        </section>
    )
}
export default ComparativePlans;