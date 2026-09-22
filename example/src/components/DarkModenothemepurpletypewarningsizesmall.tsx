import "@/styles/DarkModenothemepurpletypewarningsizesmall.css";
interface DarkModenothemepurpletypewarningsizesmallProps {
    id?: string;
    className?: string;
    slot_1_26967?: React.ReactNode;
}
const DarkModenothemepurpletypewarningsizesmall = (
    props: DarkModenothemepurpletypewarningsizesmallProps
) => {
    const { id, className = "", slot_1_26967 } = props;

    return (
        <div
            className={["component-1_26966", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26966"
                className="Pixso-symbol-1_26966 fill-systemwarning_primary-1_30133 pixso-relative-flex"
            >
                {slot_1_26967 ?? (
                    <p
                        id="1_26967"
                        className="Pixso-paragraph-1_26967 fill-dark_contentprimary-1_10529-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypewarningsizesmall;
