import "@/styles/DarkModeyesthemepurpletypewarningsizebig.css";
interface DarkModeyesthemepurpletypewarningsizebigProps {
    id?: string;
    className?: string;
    slot_1_26884?: React.ReactNode;
}
const DarkModeyesthemepurpletypewarningsizebig = (
    props: DarkModeyesthemepurpletypewarningsizebigProps
) => {
    const { id, className = "", slot_1_26884 } = props;

    return (
        <div
            className={["component-1_26883", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26883"
                className="Pixso-symbol-1_26883 fill-systemwarning_primary-1_30133 pixso-relative-flex"
            >
                {slot_1_26884 ?? (
                    <p
                        id="1_26884"
                        className="Pixso-paragraph-1_26884 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypewarningsizebig;
