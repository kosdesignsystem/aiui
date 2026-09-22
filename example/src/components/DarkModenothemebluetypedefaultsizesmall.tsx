import "@/styles/DarkModenothemebluetypedefaultsizesmall.css";
interface DarkModenothemebluetypedefaultsizesmallProps {
    id?: string;
    className?: string;
    slot_1_26973?: React.ReactNode;
}
const DarkModenothemebluetypedefaultsizesmall = (
    props: DarkModenothemebluetypedefaultsizesmallProps
) => {
    const { id, className = "", slot_1_26973 } = props;

    return (
        <div
            className={["component-1_26972", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26972"
                className="Pixso-symbol-1_26972 fill-light_backgroundbg_0-1_30126 pixso-relative-flex"
            >
                {slot_1_26973 ?? (
                    <p
                        id="1_26973"
                        className="Pixso-paragraph-1_26973 fill-light_contentprimary-1_10528-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypedefaultsizesmall;
