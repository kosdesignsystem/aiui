import "@/styles/DarkModeyesthemebluetypegreensizesmall.css";
interface DarkModeyesthemebluetypegreensizesmallProps {
    id?: string;
    className?: string;
    slot_1_26953?: React.ReactNode;
}
const DarkModeyesthemebluetypegreensizesmall = (
    props: DarkModeyesthemebluetypegreensizesmallProps
) => {
    const { id, className = "", slot_1_26953 } = props;

    return (
        <div
            className={["component-1_26952", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26952"
                className="Pixso-symbol-1_26952 fill-systemsucess_primary-1_30132 pixso-relative-flex"
            >
                {slot_1_26953 ?? (
                    <p
                        id="1_26953"
                        className="Pixso-paragraph-1_26953 fill-dark_contentprimary-1_10529-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypegreensizesmall;
