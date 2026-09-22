import "@/styles/DarkModeyesthemebluetypeaccentsizebig.css";
interface DarkModeyesthemebluetypeaccentsizebigProps {
    id?: string;
    className?: string;
    slot_1_26828?: React.ReactNode;
}
const DarkModeyesthemebluetypeaccentsizebig = (
    props: DarkModeyesthemebluetypeaccentsizebigProps
) => {
    const { id, className = "", slot_1_26828 } = props;

    return (
        <div
            className={["component-1_26827", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26827"
                className="Pixso-symbol-1_26827 fill-blueprimary-1_10439 pixso-relative-flex"
            >
                {slot_1_26828 ?? (
                    <p
                        id="1_26828"
                        className="Pixso-paragraph-1_26828 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypeaccentsizebig;
