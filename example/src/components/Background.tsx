import "@/styles/Background.css";
interface BackgroundProps {
    visible_5836_45?: boolean;
    id?: string;
    className?: string;
    __pixsoClassOverrides?: Record<string, string[]>;
}
const Background = (props: BackgroundProps) => {
    const {
        visible_5836_45 = true,
        id,
        className = "",
        __pixsoClassOverrides
    } = props;

    return (
        <div
            className={["component-3008_19675", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3008_19675"
                className="Pixso-symbol-3008_19675 pixso-position-relative"
            >
                <div
                    id="3008_19676"
                    className="Pixso-frame-3008_19676 fill-reef-darkbackground-picture-3008_19673"
                ></div>
                {visible_5836_45 && (
                    <div id="3008_19677" className="Pixso-frame-3008_19677">
                        <div
                            id="3008_19678"
                            className={[
                                "Pixso-rectangle-3008_19678 fill-reef-darkprimary-inversion-3008_19674",
                                (
                                    __pixsoClassOverrides?.[
                                        "overrideClass_3008_19678"
                                    ] || []
                                ).join(" ")
                            ]
                                .filter(Boolean)
                                .join(" ")}
                        ></div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Background;
