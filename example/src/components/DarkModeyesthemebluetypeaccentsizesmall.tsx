import "@/styles/DarkModeyesthemebluetypeaccentsizesmall.css";
interface DarkModeyesthemebluetypeaccentsizesmallProps {
    id?: string;
    className?: string;
    slot_1_26915?: React.ReactNode;
}
const DarkModeyesthemebluetypeaccentsizesmall = (
    props: DarkModeyesthemebluetypeaccentsizesmallProps
) => {
    const { id, className = "", slot_1_26915 } = props;

    return (
        <div
            className={["component-1_26914", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26914"
                className="Pixso-symbol-1_26914 fill-blueprimary-1_10439 pixso-relative-flex"
            >
                {slot_1_26915 ?? (
                    <p
                        id="1_26915"
                        className="Pixso-paragraph-1_26915 fill-dark_contentprimary-1_10529-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypeaccentsizesmall;
