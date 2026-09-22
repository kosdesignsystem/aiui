import "@/styles/DarkModenothemepurpletypeonAccentsizebig.css";
interface DarkModenothemepurpletypeonAccentsizebigProps {
    id?: string;
    className?: string;
    slot_1_26846?: React.ReactNode;
}
const DarkModenothemepurpletypeonAccentsizebig = (
    props: DarkModenothemepurpletypeonAccentsizebigProps
) => {
    const { id, className = "", slot_1_26846 } = props;

    return (
        <div
            className={["component-1_26845", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26845"
                className="Pixso-symbol-1_26845 fill-dark_contentprimary-1_10529 pixso-relative-flex"
            >
                {slot_1_26846 ?? (
                    <p
                        id="1_26846"
                        className="Pixso-paragraph-1_26846 fill-purpleprimary-1_30121-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypeonAccentsizebig;
