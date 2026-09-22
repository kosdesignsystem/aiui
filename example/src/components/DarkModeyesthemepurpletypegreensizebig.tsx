import "@/styles/DarkModeyesthemepurpletypegreensizebig.css";
interface DarkModeyesthemepurpletypegreensizebigProps {
    id?: string;
    className?: string;
    slot_1_26882?: React.ReactNode;
}
const DarkModeyesthemepurpletypegreensizebig = (
    props: DarkModeyesthemepurpletypegreensizebigProps
) => {
    const { id, className = "", slot_1_26882 } = props;

    return (
        <div
            className={["component-1_26881", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26881"
                className="Pixso-symbol-1_26881 fill-systemsucess_primary-1_30132 pixso-relative-flex"
            >
                {slot_1_26882 ?? (
                    <p
                        id="1_26882"
                        className="Pixso-paragraph-1_26882 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypegreensizebig;
