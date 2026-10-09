import ScrollAnimation from "./scrollAnimation";
import TypewriterOnScroll from "./typeWriterOnScroll";

export const IconRoad = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M6 38 C16 30, 32 30, 42 38" strokeLinecap="round" />
        <path d="M6 30 C16 22, 32 22, 42 30" strokeLinecap="round" opacity="0.5" />
        <circle cx="24" cy="12" r="6" />
    </svg>
);

export const IconFlag = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M8 40 L20 20 L28 30 L40 8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 8 H40 V16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const IconShield = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="24" cy="24" r="16" />
        <path d="M24 16 V24 L30 30" strokeLinecap="round" />
    </svg>
);

export const IconRings = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="18" cy="24" r="9" />
        <circle cx="30" cy="24" r="9" />
    </svg>
);

export const IconFifteen = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M14 38 V18 L24 8 L34 18 V38" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 38 V26 H28 V38" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const IconFamily = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="16" cy="16" r="6" />
        <circle cx="32" cy="16" r="6" />
        <path d="M6 40 C6 30, 26 30, 26 40" strokeLinecap="round" />
        <path d="M22 40 C22 30, 42 30, 42 40" strokeLinecap="round" />
    </svg>
);

export const IconStar = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M24 6 L28.5 19 H42 L31 27 L35 40 L24 32 L13 40 L17 27 L6 19 H19.5 Z" strokeLinejoin="round" />
    </svg>
);

export const IconPersonSilhouette = () => (
    <svg viewBox="0 0 48 48" fill="currentColor">
        <circle cx="24" cy="17" r="9" />
        <path d="M6 42c0-10 8-16 18-16s18 6 18 16" />
    </svg>
);

const ICONS = {
    road: IconRoad,
    flag: IconFlag,
    shield: IconShield,
    rings: IconRings,
    fifteen: IconFifteen,
    family: IconFamily,
    star: IconStar
};

export const StoryTeller = (props) => {
    const blocks = props.data.blocks ?? [];

    return (
        <section className={"storyTeller " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}>
            {blocks.map((block, index) => renderBlock(block, index))}
        </section>
    );
}

function renderBlock(block, index) {
    switch (block.type) {
        case "heroLine":
            return <HeroLineBlock key={index} block={block} />;
        case "heroWithImg":
            return <HeroWithImgBlock key={index} block={block} />;
        case "sectionTextImgCenter":
            return <SectionTextImgCenter key={index} block={block} />;
        case "sectionTextImgLeft":
            return <SectionTextImgLeft key={index} block={block} />;
        case "sectionImgBg":
            return <SectionImgBg key={index} block={block} />;
        case "footerStory":
            return <FooterStory key={index} block={block} />;
        case "title":
            return <TitleBlock key={index} block={block} />;
        case "typewriter":
            return <TypewriterBlock key={index} block={block} />;
        case "lessonsList":
            return <LessonsListBlock key={index} block={block} />;
        case "reveal":
            return <RevealBlock key={index} block={block} />;
        case "paragraph":
            return <ParagraphBlock key={index} block={block} />;
        case "iconsGrid":
            return <IconsGridBlock key={index} block={block} />;
        case "closingLines":
            return <ClosingLinesBlock key={index} block={block} />;
        case "photoSignature":
            return <PhotoSignatureBlock key={index} block={block} />;
        default:
            return null;
    }
}

//Bloques individuales

const HeroLineBlock = ({ block }) => (
    <div className="storyTeller-block storyTeller-hero">
        <ScrollAnimation
            animation={block.typeAnimation}
            pixelsDisplacement={block.pixelsAnimation}
            duration={block.durationAnimation}
            delay={block.delayAnimation}
        >
            <p className="storyTeller-heroLine">
                {block.text}
            </p>
        </ScrollAnimation>
    </div>
);

const HeroWithImgBlock = ({ block }) => (
    <div className="storyTeller-block storyTeller-heroWithImg">
        <img
            className="storyTeller-heroWithImg-img"
            alt={block.altImg}
            src={block.img}
        />
        <ScrollAnimation animation={"left"} duration={2000} pixelsDisplacement={80}>
            <img
                className="storyTeller-heroWithImg-imgDecoration"
                alt={block.altImgDecoration ?? "Objeto decorativo"}
                src={block.imgDecoration}
            />
        </ScrollAnimation>
        <ScrollAnimation
            animation={block.typeAnimation}
            pixelsDisplacement={block.pixelsAnimation}
            duration={block.durationAnimation}
            delay={block.delayAnimation}
        >
            <div className="storyTeller-heroWithImg-content">
                <img
                    className="storyTeller-heroWithImg-content-logo"
                    alt={block.altLogo}
                    src={block.logo}
                />
                <div className="storyTeller-divider-horizontal" aria-hidden="true"></div>
                {
                    block.isMainH1 ?
                    <h1 className="storyTeller-heroWithImg-content-title">
                        <span>{block.subTitle}</span>
                        {block.title}
                    </h1>
                    :
                    <h2 className="storyTeller-heroWithImg-content-title">
                        <span>{block.subTitle}</span>
                        {block.title}
                    </h2>
                }
                <p className="storyTeller-heroWithImg-content-description">
                    {block.text}
                </p>
                <div className="storyTeller-divider-horizontal" aria-hidden="true"></div>
            </div>
        </ScrollAnimation>
    </div>
);

const SectionTextImgCenter = ({ block }) => (
    <div
        className={
            "storyTeller-block storyTeller-sectionTextImgCenter " +
            (block.background === "soft" ? "storyTeller-sectionTextImgCenter-lightBg" : "storyTeller-sectionTextImgCenter-darkBg")
        }
    >
        {
            block.imgDecorationLeft ?
            <img
                className="storyTeller-sectionTextImgCenter-imgDecorationLeft"
                src={block.imgDecorationLeft}
                alt={block.altImgDecorationLeft ?? "Objeto decorativo"}
            />
            :
            ""
        }
        {
            block.imgDecorationRight ?
            <img
                className="storyTeller-sectionTextImgCenter-imgDecorationRight"
                src={block.imgDecorationRight}
                alt={block.altImgDecorationRight ?? "Objeto decorativo"}
            />
            :
            ""
        }
        <div className="storyTeller-sectionTextImgCenter-container">
            <ScrollAnimation
                animation={block.typeAnimationPart1}
                pixelsDisplacement={block.pixelsAnimationPart1}
                duration={block.durationAnimationPart1}
                delay={block.delayAnimationPart1}
            >
                <div className="storyTeller-sectionTextImgCenter-part1">
                    <div className="storyTeller-sectionTextImgCenter-part1-number">
                        <p className="storyTeller-sectionTextImgCenter-part1-number-text">{block.numberSection}</p>
                        <div className="storyTeller-divider-horizontal" aria-hidden="true"></div>
                    </div>
                    <h2 className="storyTeller-sectionTextImgCenter-part1-title">
                        {block.titlePart1}
                    </h2>
                    <p className="storyTeller-sectionTextImgCenter-part1-parragraph">
                        {block.parragraphPart1FirstPart}
                        <span>{block.highLightPartParragraph}</span>
                        {block.parragraphPart1SecondPart}
                    </p>
                    <p className="storyTeller-sectionTextImgCenter-part1-brandMessage">{block.brandMessage}</p>
                </div>
            </ScrollAnimation>
            <ScrollAnimation
                animation={block.typeAnimationImg}
                pixelsDisplacement={block.pixelsAnimationImg}
                duration={block.durationAnimationImg}
                delay={block.delayAnimationImg}
            >
                <div className="storyTeller-sectionTextImgCenter-img-container">
                    <img
                        className="storyTeller-sectionTextImgCenter-img"
                        alt={block.altImg}
                        src={block.img}
                    />
                </div>
            </ScrollAnimation>
            {
                block.haveQuotation ? //valida  si la parte 2 es un texto o una cita
                <div className="storyTeller-sectionTextImgCenter-quotation">
                    <i className={"storyTeller-sectionTextImgCenter-quotation-icon " + block.iconQuotation}></i>
                    {
                        block.typedQuotation ?
                        <TypewriterOnScroll
                            text={block.quotation}
                            speed={block.speedTyping}
                            className="storyTeller-sectionTextImgCenter-quotation-text"
                        />
                        :
                        <p className="storyTeller-sectionTextImgCenter-quotation-text">{block.quotation}</p>
                    }
                    <div className="storyTeller-divider-horizontal storyTeller-divider-quotation" aria-hidden="true"></div>
                </div>
                :
                <div className="storyTeller-sectionTextImgCenter-part2">
                    <div className="storyTeller-divider-vertical" aria-hidden="true"></div>
                    <div className="storyTeller-sectionTextImgCenter-part2-container">
                        <i className={"storyTeller-sectionTextImgCenter-part2-icon " + block.iconPart2}></i>
                        <p className="storyTeller-sectionTextImgCenter-part2-text">{block.parragraphPart2}</p>
                    </div>
                </div>
            }
        </div>
    </div>
);

const SectionTextImgLeft = ({ block }) => (
    <div
        className={
            "storyTeller-sectionTextImgLeft " +
            (block.background === "soft" ? "storyTeller-sectionTextImgCenter-lightBg" : "storyTeller-sectionTextImgCenter-darkBg")
        }
    >
        <ScrollAnimation
            animation={block.typeAnimationImg}
            pixelsDisplacement={block.pixelsAnimationImg}
            duration={block.durationAnimationImg}
            delay={block.delayAnimationImg}
        >
            <div className="storyTeller-sectionTextImgLeft-img-container">
                <img
                    className="storyTeller-sectionTextImgLeft-img"
                    src={block.img}
                    alt={block.altImg}
                />
            </div>
        </ScrollAnimation>
        <ScrollAnimation
            animation={block.typeAnimationPart1}
            pixelsDisplacement={block.pixelsAnimationPart1}
            duration={block.durationAnimationPart1}
            delay={block.delayAnimationPart1}
        >
            <div className="storyTeller-sectionTextImgLeft-part1">
                <div className="storyTeller-sectionTextImgCenter-part1-number">
                    <p className="storyTeller-sectionTextImgCenter-part1-number-text">{block.numberSection}</p>
                    <div className="storyTeller-divider-horizontal" aria-hidden="true"></div>
                </div>
                <h2 className="storyTeller-sectionTextImgLeft-part1-title">
                    {block.titlePart1}
                </h2>
                <p className="storyTeller-sectionTextImgLeft-part1-parragraph">
                    {block.parragraphPart1FirstPart}
                    <span>{block.highLightPartParragraph}</span>
                    {block.parragraphPart1SecondPart}
                </p>
            </div>
        </ScrollAnimation>
        <ScrollAnimation animation={block.typeAnimationItems} pixelsDisplacement={block.pixelsAnimationItems} duration={block.durationAnimationItems} delay={block.delayAnimationItems}>
            <div className="storyTeller-sectionTextImgLeft-listItems">
                <div className="storyTeller-divider-vertical-sectionTextImgLeft" aria-hidden="true"></div>
                <ul className="storyTeller-sectionTextImgLeft-listItems-items">
                    {
                        block.listItems.map((item, index)=>(
                            <li className="storyTeller-sectionTextImgLeft-listItems-items-item" key={item.text + index}>
                                <i className={"storyTeller-sectionTextImgLeft-listItems-items-item-icon " + item.icon}></i>
                                <p className="storyTeller-sectionTextImgLeft-listItems-items-item-text">{item.text}</p>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </ScrollAnimation>
    </div>
);

const SectionImgBg = ({ block }) => (
    <div
        className={
            "storyTeller-block storyTeller-sectionImgBg " +
            (block.background === "soft" ? "storyTeller-sectionTextImgCenter-lightBg" : "storyTeller-sectionTextImgCenter-darkBg")
        }
        style={{ backgroundImage: `url(${block.imgBackground})` }}
    >
        {
            block.imgDecorationRight ?
            <img
                className="storyTeller-sectionTextImgCenter-imgDecorationRight"
                src={block.imgDecorationRight}
                alt={block.altImgDecorationRight ?? "Objeto decorativo"}
            />
            :
            ""
        }
        <div className="storyTeller-sectionImgBg-container">
            <ScrollAnimation
                animation={block.typeAnimationPart1}
                pixelsDisplacement={block.pixelsAnimationPart1}
                duration={block.durationAnimationPart1}
                delay={block.delayAnimationPart1}
            >
                <div className="storyTeller-sectionImgBg-part1">
                    <div className="storyTeller-sectionTextImgCenter-part1-number">
                        <p className="storyTeller-sectionTextImgCenter-part1-number-text">{block.numberSection}</p>
                        <div className="storyTeller-divider-horizontal" aria-hidden="true"></div>
                    </div>
                    <h2 className="storyTeller-sectionTextImgCenter-part1-title">
                        {block.titlePart1}
                    </h2>
                    <p className="storyTeller-sectionTextImgCenter-part1-parragraph">
                        {block.parragraphPart1FirstPart}
                        <span>{block.highLightPartParragraph}</span>
                        {block.parragraphPart1SecondPart}
                    </p>
                    <div className="storyTeller-sectionImgBg-part1-footer">
                        <i className={"storyTeller-sectionImgBg-part1-footer-icon " + block.iconFooter}></i>
                        <div className="storyTeller-divider-horizontal storyTeller-divider-sectionImgBg" aria-hidden="true"></div>
                    </div>
                </div>
            </ScrollAnimation>
            
        </div>
    </div>
);

const FooterStory = ({ block }) => (
    <div
        className={
            "storyTeller-block storyTeller-sectionFooterStory " +
            (block.background === "soft" ? "storyTeller-sectionTextImgCenter-lightBg" : "storyTeller-sectionTextImgCenter-darkBg")
        }
    >
        {
            block.imgDecorationLeft ?
            <img
                className="storyTeller-sectionTextImgCenter-imgDecorationLeft"
                src={block.imgDecorationLeft}
                alt={block.altImgDecorationLeft ?? "Objeto decorativo"}
            />
            :
            ""
        }
        {
            block.imgDecorationRight ?
            <img
                className="storyTeller-sectionTextImgCenter-imgDecorationRight"
                src={block.imgDecorationRight}
                alt={block.altImgDecorationRight ?? "Objeto decorativo"}
            />
            :
            ""
        }
        <ScrollAnimation animation={block.typeAnimationPart1} pixelsDisplacement={block.pixelsAnimationPart1} duration={block.durationAnimationPart1} delay={block.delayAnimationPart1}>
            <div className="storyTeller-sectionFooterStory-container">
                <img
                    className="storyTeller-sectionFooterStory-logo"
                    alt={block.altLogo}
                    src={block.imgLogo}
                />
                <p className="storyTeller-sectionFooterStory-text">{block.text}</p>
            </div>
        </ScrollAnimation>
    </div>
);

const TitleBlock = ({ block }) => (
    <div className="storyTeller-block storyTeller-title">
        <ScrollAnimation
            animation={block.typeAnimation}
            pixelsDisplacement={block.pixelsAnimation}
            duration={block.durationAnimation}
            delay={block.delayAnimation}
        >
            {
                block.subTitle ?
                <p className="storyTeller-subTitle">{block.subTitle}</p>
                :
                ""
            }
            {
                block.isMainH1 ? 
                <h1 className="storyTeller-titleText">{block.title}</h1>
                :
                <h2 className="storyTeller-titleText">{block.title}</h2>
            }
        </ScrollAnimation>
    </div>
);

const TypewriterBlock = ({ block }) => (
    <div className={"storyTeller-block " + (block.dark ? "storyTeller-dark" : "")}>
        {
            block.showTimelineDot ?
            <div className="storyTeller-timelineDot" aria-hidden="true"/>
            :
            ""
        }
        <TypewriterOnScroll
            text={block.text}
            speed={block.speedTyping}
            className="storyTeller-typewriterText"
        />
    </div>
);

const LessonsListBlock = ({ block }) => (
    <div className="storyTeller-block">
        <div className="storyTeller-lessons">
            {
                block.items.map((item, i) => (
                    <ScrollAnimation
                        key={i}
                        animation={item.typeAnimation}
                        pixelsDisplacement={block.pixelsAnimation}
                        duration={block.durationAnimation}
                        delay={item.delayAnimation ?? i * 120}
                    >
                        <div
                            className={
                                "storyTeller-lesson " +
                                (item.typeAnimation === "right" ? "storyTeller-lesson--reverse" : "")
                            }
                        >
                            <i className={"storyTeller-lessonIcon " + item.icon}></i>
                            <p className="storyTeller-lessonText">{item.text}</p>
                        </div>
                    </ScrollAnimation>
                ))
            }
        </div>
    </div>
);

const RevealBlock = ({ block }) => (
    <div className={"storyTeller-block " + (block.dark ? "storyTeller-dark" : "")}>
        {
            block.showTimelineDot ?
            <div className="storyTeller-timelineDot" aria-hidden="true"/>
            :
            ""
        }
        <ScrollAnimation animation={block.typeAnimationLead} duration={block.durationAnimationLead} pixelsDisplacement={block.pixelsAnimationLead} delay={block.delayAnimationLead}>
            <p className="storyTeller-revealLead">{block.leadText}</p>
        </ScrollAnimation>
        <ScrollAnimation animation={block.typeAnimationReveal} duration={block.durationAnimationReveal} pixelsDisplacement={block.pixelsAnimationReveal} delay={block.delayAnimationReveal}>
            <h2 className="storyTeller-revealName">{block.revealText}</h2>
        </ScrollAnimation>
    </div>
);

const ParagraphBlock = ({ block }) => (
    <div className="storyTeller-block storyTeller-purpose">
        <ScrollAnimation animation={block.typeAnimation} duration={block.durationAnimation}>
            <p className="storyTeller-purpose-text">{block.text}</p>
        </ScrollAnimation>
    </div>
);

const IconsGridBlock = ({ block }) => (
    <div className="storyTeller-block storyTeller-moments">
        <ScrollAnimation animation={block.typeAnimationIntro} duration={block.durationAnimationIntro}>
            <p className="storyTeller-momentsIntro">{block.intro}</p>
        </ScrollAnimation>
        <div className="storyTeller-momentsGrid">
            {
                block.items.map((item, i) => (
                    <ScrollAnimation key={i} animation={item.typeAnimation} pixelsDisplacement={30} duration={800} delay={i * 120}>
                        <div className="storyTeller-moment">
                            <i className={"storyTeller-momentIcon " + item.icon}></i>
                            <span className="storyTeller-moment-text">{item.text}</span>
                        </div>
                    </ScrollAnimation>
                ))
            }
        </div>
    </div>
);

const ClosingLinesBlock = ({ block }) => (
    <div className={"storyTeller-block " + (block.dark ? "storyTeller-dark" : "")}>
        <ScrollAnimation animation={block.typeAnimationIntro} duration={block.durationAnimationIntro} pixelsDisplacement={block.pixelsAnimationIntro} delay={block.delayAnimationIntro}>
            <p className="storyTeller-closingIntro">{block.intro}</p>
        </ScrollAnimation>
        {
            block.lines.map((line, i) => (
                <ScrollAnimation key={i} animation={block.typeAnimation} pixelsDisplacement={block.pixelsAnimation} duration={block.durationAnimation} delay={i * (block.delayEachLine ?? 250)}>
                    <p className={"storyTeller-closingLine " + (line.gold ? "storyTeller-closingLine-gold" : "")}>
                        {line.text}
                    </p>
                </ScrollAnimation>
            )
        )}
    </div>
);

const PhotoSignatureBlock = ({ block }) => (
    <div className="storyTeller-block storyTeller-photoBlock">
        {
            block.showTimelineDot ? 
            <div className="storyTeller-timelineDot" aria-hidden="true"/>
            :
            ""
        }
        <ScrollAnimation animation="zoom" duration={1000}>
            <div className="storyTeller-photoFrame">
                <img
                    src={block.img}
                    alt={block.name}
                    className="storyTeller-photoFrame-img"
                />
            </div>
        </ScrollAnimation>
        <ScrollAnimation animation="fade" duration={900}>
            <p className="storyTeller-photoName">{block.name}</p>
            <p className="storyTeller-photoYears">{block.years}</p>
        </ScrollAnimation>
        <ScrollAnimation animation="fade" duration={1200} delay={200}>
            <p className="storyTeller-photoQuote">{block.quote}</p>
        </ScrollAnimation>
        <ScrollAnimation animation="fade" duration={900} delay={400}>
            <p className="storyTeller-photoBrand">{block.brand}</p>
        </ScrollAnimation>
    </div>
);

export default StoryTeller;