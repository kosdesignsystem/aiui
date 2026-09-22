import "@/styles/DarkModenothemepurpletypegreensizesmall.css";
interface DarkModenothemepurpletypegreensizesmallProps {
    id?: string;
    className?: string;
    slot_1_26965?: React.ReactNode;
}
const DarkModenothemepurpletypegreensizesmall = (
    props: DarkModenothemepurpletypegreensizesmallProps
) => {
    const { id, className = "", slot_1_26965 } = props;

    return (
        <div
            className={["component-1_26964", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26964"
                className="Pixso-symbol-1_26964 fill-systemsucess_primary-1_30132 pixso-relative-flex"
            >
                {slot_1_26965 ?? (
                    <p
                        id="1_26965"
                        className="Pixso-paragraph-1_26965 fill-dark_contentprimary-1_10529-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypegreensizesmall;
