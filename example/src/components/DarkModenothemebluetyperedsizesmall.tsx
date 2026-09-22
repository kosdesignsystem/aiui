import "@/styles/DarkModenothemebluetyperedsizesmall.css";
interface DarkModenothemebluetyperedsizesmallProps {
    id?: string;
    className?: string;
    slot_1_26937?: React.ReactNode;
}
const DarkModenothemebluetyperedsizesmall = (
    props: DarkModenothemebluetyperedsizesmallProps
) => {
    const { id, className = "", slot_1_26937 } = props;

    return (
        <div
            className={["component-1_26936", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26936"
                className="Pixso-symbol-1_26936 fill-systemerror_primary-1_30131 pixso-relative-flex"
            >
                {slot_1_26937 ?? (
                    <p
                        id="1_26937"
                        className="Pixso-paragraph-1_26937 fill-dark_contentprimary-1_10529-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemebluetyperedsizesmall;
