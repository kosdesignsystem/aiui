import "@/styles/DarkModeyesthemebluetyperedsizesmall.css";
interface DarkModeyesthemebluetyperedsizesmallProps {
    id?: string;
    className?: string;
    slot_1_26939?: React.ReactNode;
}
const DarkModeyesthemebluetyperedsizesmall = (
    props: DarkModeyesthemebluetyperedsizesmallProps
) => {
    const { id, className = "", slot_1_26939 } = props;

    return (
        <div
            className={["component-1_26938", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26938"
                className="Pixso-symbol-1_26938 fill-systemerror_primary-1_30131 pixso-relative-flex"
            >
                {slot_1_26939 ?? (
                    <p
                        id="1_26939"
                        className="Pixso-paragraph-1_26939 fill-dark_contentprimary-1_10529-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetyperedsizesmall;
