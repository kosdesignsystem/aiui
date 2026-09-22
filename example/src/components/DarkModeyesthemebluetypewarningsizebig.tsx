import "@/styles/DarkModeyesthemebluetypewarningsizebig.css";
interface DarkModeyesthemebluetypewarningsizebigProps {
    id?: string;
    className?: string;
    slot_1_26868?: React.ReactNode;
}
const DarkModeyesthemebluetypewarningsizebig = (
    props: DarkModeyesthemebluetypewarningsizebigProps
) => {
    const { id, className = "", slot_1_26868 } = props;

    return (
        <div
            className={["component-1_26867", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26867"
                className="Pixso-symbol-1_26867 fill-systemwarning_primary-1_30133 pixso-relative-flex"
            >
                {slot_1_26868 ?? (
                    <p
                        id="1_26868"
                        className="Pixso-paragraph-1_26868 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypewarningsizebig;
