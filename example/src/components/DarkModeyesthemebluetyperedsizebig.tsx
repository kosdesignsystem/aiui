import "@/styles/DarkModeyesthemebluetyperedsizebig.css";
interface DarkModeyesthemebluetyperedsizebigProps {
    id?: string;
    className?: string;
    slot_1_26852?: React.ReactNode;
}
const DarkModeyesthemebluetyperedsizebig = (
    props: DarkModeyesthemebluetyperedsizebigProps
) => {
    const { id, className = "", slot_1_26852 } = props;

    return (
        <div
            className={["component-1_26851", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26851"
                className="Pixso-symbol-1_26851 fill-systemerror_primary-1_30131 pixso-relative-flex"
            >
                {slot_1_26852 ?? (
                    <p
                        id="1_26852"
                        className="Pixso-paragraph-1_26852 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetyperedsizebig;
