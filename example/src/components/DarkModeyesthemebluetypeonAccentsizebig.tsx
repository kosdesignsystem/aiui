import "@/styles/DarkModeyesthemebluetypeonAccentsizebig.css";
interface DarkModeyesthemebluetypeonAccentsizebigProps {
    id?: string;
    className?: string;
    slot_1_26840?: React.ReactNode;
}
const DarkModeyesthemebluetypeonAccentsizebig = (
    props: DarkModeyesthemebluetypeonAccentsizebigProps
) => {
    const { id, className = "", slot_1_26840 } = props;

    return (
        <div
            className={["component-1_26839", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26839"
                className="Pixso-symbol-1_26839 fill-dark_contentprimary-1_10529 pixso-relative-flex"
            >
                {slot_1_26840 ?? (
                    <p
                        id="1_26840"
                        className="Pixso-paragraph-1_26840 fill-blueprimary-1_10439-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypeonAccentsizebig;
