import "@/styles/DarkModeyesthemepurpletypeonAccentsizebig.css";
interface DarkModeyesthemepurpletypeonAccentsizebigProps {
    id?: string;
    className?: string;
    slot_1_26848?: React.ReactNode;
}
const DarkModeyesthemepurpletypeonAccentsizebig = (
    props: DarkModeyesthemepurpletypeonAccentsizebigProps
) => {
    const { id, className = "", slot_1_26848 } = props;

    return (
        <div
            className={["component-1_26847", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26847"
                className="Pixso-symbol-1_26847 fill-dark_contentprimary-1_10529 pixso-relative-flex"
            >
                {slot_1_26848 ?? (
                    <p
                        id="1_26848"
                        className="Pixso-paragraph-1_26848 fill-purpleprimary-1_30121-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypeonAccentsizebig;
