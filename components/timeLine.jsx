import ScrollAnimation from "./scrollAnimation";
import React from "react";

export const TimeLine = (props) => {
    
    return (
        <section className={"timeLine " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
            <ul className="timeLine-container">
                <div className="timeLine-milestone-container">
                    {
                        props.data.milestones.map((item, index)=>(
                            <li
                                className="timeLine-milestone" key={item.moment + index}
                                style={{ color: item.color ?? undefined }}
                            >
                                <h2 className="timeLine-milestone-text">{item.moment}</h2>
                                <div className="timeLine-milestone-facts">
                                    {
                                        item.facts.map((fact, indexJ) =>(
                                            <p className="timeLine-milestone-facts-fact" key={fact + index + indexJ}>
                                                <span>{"• "}</span>{fact}
                                            </p>
                                        ))
                                    }
                                </div>
                            </li>
                        ))
                    }
                </div>
            </ul>
        </section>
    )
}
export default TimeLine;