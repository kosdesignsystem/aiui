import "@/styles/DarkModeyesthemebluetypewarningsizesmall.css";
interface DarkModeyesthemebluetypewarningsizesmallProps {
    id?: string;
    className?: string;
    slot_1_26955?: React.ReactNode;
}
const DarkModeyesthemebluetypewarningsizesmall = (
    props: DarkModeyesthemebluetypewarningsizesmallProps
) => {
    const { id, className = "", slot_1_26955 } = props;

    return (
        <div
            className={["component-1_26954", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26954"
                className="Pixso-symbol-1_26954 fill-systemwarning_primary-1_30133 pixso-relative-flex"
            >
                {slot_1_26955 ?? (
                    <p
                        id="1_26955"
                        className="Pixso-paragraph-1_26955 fill-dark_contentprimary-1_10529-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypewarningsizesmall;
