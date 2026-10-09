"use client";

import { useState, useEffect, useRef } from "react";

export const TypewriterOnScroll = ({ text, speed = 50, className }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [started, setStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!started) return;
        let i = 0;
        const interval = setInterval(() => {
            setDisplayedText(text.slice(0, i + 1));
            i++;
            if (i === text.length) clearInterval(interval);
        }, speed);
        return () => clearInterval(interval);
    }, [started, text, speed]);

    return (
        <>
            <p ref={ref} className={className} aria-hidden="true">
                {displayedText}
            </p>
            <p className="visually-hidden">{text}</p>
        </>
    );
};
export default TypewriterOnScroll;