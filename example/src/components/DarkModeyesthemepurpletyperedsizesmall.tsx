import "@/styles/DarkModeyesthemepurpletyperedsizesmall.css";
interface DarkModeyesthemepurpletyperedsizesmallProps {
    id?: string;
    className?: string;
    slot_1_26947?: React.ReactNode;
}
const DarkModeyesthemepurpletyperedsizesmall = (
    props: DarkModeyesthemepurpletyperedsizesmallProps
) => {
    const { id, className = "", slot_1_26947 } = props;

    return (
        <div
            className={["component-1_26946", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26946"
                className="Pixso-symbol-1_26946 fill-systemerror_primary-1_30131 pixso-relative-flex"
            >
                {slot_1_26947 ?? (
                    <p
                        id="1_26947"
                        className="Pixso-paragraph-1_26947 fill-dark_contentprimary-1_10529-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletyperedsizesmall;
