import "@/styles/DarkModenothemebluetyperedsizebig.css";
interface DarkModenothemebluetyperedsizebigProps {
    id?: string;
    className?: string;
    slot_1_26850?: React.ReactNode;
}
const DarkModenothemebluetyperedsizebig = (
    props: DarkModenothemebluetyperedsizebigProps
) => {
    const { id, className = "", slot_1_26850 } = props;

    return (
        <div
            className={["component-1_26849", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26849"
                className="Pixso-symbol-1_26849 fill-systemerror_primary-1_30131 pixso-relative-flex"
            >
                {slot_1_26850 ?? (
                    <p
                        id="1_26850"
                        className="Pixso-paragraph-1_26850 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemebluetyperedsizebig;
