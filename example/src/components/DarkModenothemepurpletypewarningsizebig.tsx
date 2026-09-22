import "@/styles/DarkModenothemepurpletypewarningsizebig.css";
interface DarkModenothemepurpletypewarningsizebigProps {
    id?: string;
    className?: string;
    slot_1_26880?: React.ReactNode;
}
const DarkModenothemepurpletypewarningsizebig = (
    props: DarkModenothemepurpletypewarningsizebigProps
) => {
    const { id, className = "", slot_1_26880 } = props;

    return (
        <div
            className={["component-1_26879", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26879"
                className="Pixso-symbol-1_26879 fill-systemwarning_primary-1_30133 pixso-relative-flex"
            >
                {slot_1_26880 ?? (
                    <p
                        id="1_26880"
                        className="Pixso-paragraph-1_26880 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypewarningsizebig;
