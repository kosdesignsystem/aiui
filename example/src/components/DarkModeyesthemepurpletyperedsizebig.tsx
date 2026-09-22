import "@/styles/DarkModeyesthemepurpletyperedsizebig.css";
interface DarkModeyesthemepurpletyperedsizebigProps {
    id?: string;
    className?: string;
    slot_1_26860?: React.ReactNode;
}
const DarkModeyesthemepurpletyperedsizebig = (
    props: DarkModeyesthemepurpletyperedsizebigProps
) => {
    const { id, className = "", slot_1_26860 } = props;

    return (
        <div
            className={["component-1_26859", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26859"
                className="Pixso-symbol-1_26859 fill-systemerror_primary-1_30131 pixso-relative-flex"
            >
                {slot_1_26860 ?? (
                    <p
                        id="1_26860"
                        className="Pixso-paragraph-1_26860 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletyperedsizebig;
