import "@/styles/DarkModenothemepurpletypeaccentsizesmall.css";
interface DarkModenothemepurpletypeaccentsizesmallProps {
    id?: string;
    className?: string;
    slot_1_26921?: React.ReactNode;
}
const DarkModenothemepurpletypeaccentsizesmall = (
    props: DarkModenothemepurpletypeaccentsizesmallProps
) => {
    const { id, className = "", slot_1_26921 } = props;

    return (
        <div
            className={["component-1_26920", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26920"
                className="Pixso-symbol-1_26920 fill-purpleprimary-1_30121 pixso-relative-flex"
            >
                {slot_1_26921 ?? (
                    <p
                        id="1_26921"
                        className="Pixso-paragraph-1_26921 fill-dark_contentprimary-1_10529-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypeaccentsizesmall;
