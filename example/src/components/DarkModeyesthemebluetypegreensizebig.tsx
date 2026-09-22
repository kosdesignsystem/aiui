import "@/styles/DarkModeyesthemebluetypegreensizebig.css";
interface DarkModeyesthemebluetypegreensizebigProps {
    id?: string;
    className?: string;
    slot_1_26866?: React.ReactNode;
}
const DarkModeyesthemebluetypegreensizebig = (
    props: DarkModeyesthemebluetypegreensizebigProps
) => {
    const { id, className = "", slot_1_26866 } = props;

    return (
        <div
            className={["component-1_26865", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26865"
                className="Pixso-symbol-1_26865 fill-systemsucess_primary-1_30132 pixso-relative-flex"
            >
                {slot_1_26866 ?? (
                    <p
                        id="1_26866"
                        className="Pixso-paragraph-1_26866 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypegreensizebig;
