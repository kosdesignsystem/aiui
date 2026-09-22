import "@/styles/DarkModeyesthemepurpletypeaccentsizebig.css";
interface DarkModeyesthemepurpletypeaccentsizebigProps {
    id?: string;
    className?: string;
    slot_1_26836?: React.ReactNode;
}
const DarkModeyesthemepurpletypeaccentsizebig = (
    props: DarkModeyesthemepurpletypeaccentsizebigProps
) => {
    const { id, className = "", slot_1_26836 } = props;

    return (
        <div
            className={["component-1_26835", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26835"
                className="Pixso-symbol-1_26835 fill-purpleprimary-1_30121 pixso-relative-flex"
            >
                {slot_1_26836 ?? (
                    <p
                        id="1_26836"
                        className="Pixso-paragraph-1_26836 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypeaccentsizebig;
