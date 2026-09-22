import "@/styles/DarkModeyesthemepurpletypewarningsizesmall.css";
interface DarkModeyesthemepurpletypewarningsizesmallProps {
    id?: string;
    className?: string;
    slot_1_26971?: React.ReactNode;
}
const DarkModeyesthemepurpletypewarningsizesmall = (
    props: DarkModeyesthemepurpletypewarningsizesmallProps
) => {
    const { id, className = "", slot_1_26971 } = props;

    return (
        <div
            className={["component-1_26970", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26970"
                className="Pixso-symbol-1_26970 fill-systemwarning_primary-1_30133 pixso-relative-flex"
            >
                {slot_1_26971 ?? (
                    <p
                        id="1_26971"
                        className="Pixso-paragraph-1_26971 fill-dark_contentprimary-1_10529-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypewarningsizesmall;
