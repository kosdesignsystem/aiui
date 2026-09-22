import "@/styles/DarkModeyesthemebluetypedefaultsizesmall.css";
interface DarkModeyesthemebluetypedefaultsizesmallProps {
    id?: string;
    className?: string;
    slot_1_26975?: React.ReactNode;
}
const DarkModeyesthemebluetypedefaultsizesmall = (
    props: DarkModeyesthemebluetypedefaultsizesmallProps
) => {
    const { id, className = "", slot_1_26975 } = props;

    return (
        <div
            className={["component-1_26974", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26974"
                className="Pixso-symbol-1_26974 fill-dark_backgroundbg_0-1_30127 pixso-relative-flex"
            >
                {slot_1_26975 ?? (
                    <p
                        id="1_26975"
                        className="Pixso-paragraph-1_26975 fill-dark_contentprimary-1_10529-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
                <div
                    id="1_26976"
                    className="Pixso-rectangle-1_26976 fill-dark_contentplashka-1_30095"
                ></div>
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypedefaultsizesmall;
