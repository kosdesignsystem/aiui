import "@/styles/Pageindicator.css";
interface PageindicatorProps {
    id?: string;
    className?: string;
    __pixsoClassOverrides?: Record<string, string[]>;
}
const Pageindicator = (props: PageindicatorProps) => {
    const { id, className = "", __pixsoClassOverrides } = props;

    return (
        <div
            className={["component-3008_19680", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3008_19680"
                className="Pixso-symbol-3008_19680 pixso-position-relative"
            >
                <div id="3008_19681" className="stroke-wrapper-3008_19681">
                    <div
                        className={[
                            "Pixso-rectangle-3008_19681 fill-reef-darkprimary-3008_19679 pixso-position-relative",
                            (
                                __pixsoClassOverrides?.[
                                    "overrideClass_3008_19681"
                                ] || []
                            ).join(" ")
                        ]
                            .filter(Boolean)
                            .join(" ")}
                    ></div>
                    <div
                        className={[
                            "stroke-3008_19681 stroke-reef-darkprimary-3008_19679",
                            (
                                __pixsoClassOverrides?.[
                                    "overrideStrokeClass_3008_19681"
                                ] || []
                            ).join(" ")
                        ]
                            .filter(Boolean)
                            .join(" ")}
                    ></div>
                </div>
            </div>
        </div>
    );
};
export default Pageindicator;
