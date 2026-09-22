import "@/styles/DarkModeyesthemepurpletypeaccentsizesmall.css";
interface DarkModeyesthemepurpletypeaccentsizesmallProps {
    id?: string;
    className?: string;
    slot_1_26923?: React.ReactNode;
}
const DarkModeyesthemepurpletypeaccentsizesmall = (
    props: DarkModeyesthemepurpletypeaccentsizesmallProps
) => {
    const { id, className = "", slot_1_26923 } = props;

    return (
        <div
            className={["component-1_26922", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26922"
                className="Pixso-symbol-1_26922 fill-purpleprimary-1_30121 pixso-relative-flex"
            >
                {slot_1_26923 ?? (
                    <p
                        id="1_26923"
                        className="Pixso-paragraph-1_26923 fill-dark_contentprimary-1_10529-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypeaccentsizesmall;
