import "@/styles/DarkModenothemepurpletypeaccentsizebig.css";
interface DarkModenothemepurpletypeaccentsizebigProps {
    id?: string;
    className?: string;
    slot_1_26834?: React.ReactNode;
}
const DarkModenothemepurpletypeaccentsizebig = (
    props: DarkModenothemepurpletypeaccentsizebigProps
) => {
    const { id, className = "", slot_1_26834 } = props;

    return (
        <div
            className={["component-1_26833", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26833"
                className="Pixso-symbol-1_26833 fill-purpleprimary-1_30121 pixso-relative-flex"
            >
                {slot_1_26834 ?? (
                    <p
                        id="1_26834"
                        className="Pixso-paragraph-1_26834 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypeaccentsizebig;
