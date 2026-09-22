import "@/styles/DarkModeyesthemepurpletypegreensizesmall.css";
interface DarkModeyesthemepurpletypegreensizesmallProps {
    id?: string;
    className?: string;
    slot_1_26969?: React.ReactNode;
}
const DarkModeyesthemepurpletypegreensizesmall = (
    props: DarkModeyesthemepurpletypegreensizesmallProps
) => {
    const { id, className = "", slot_1_26969 } = props;

    return (
        <div
            className={["component-1_26968", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26968"
                className="Pixso-symbol-1_26968 fill-systemsucess_primary-1_30132 pixso-relative-flex"
            >
                {slot_1_26969 ?? (
                    <p
                        id="1_26969"
                        className="Pixso-paragraph-1_26969 fill-dark_contentprimary-1_10529-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypegreensizesmall;
