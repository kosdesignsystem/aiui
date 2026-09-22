import "@/styles/DarkModenothemepurpletypeonAccentsizesmall.css";
interface DarkModenothemepurpletypeonAccentsizesmallProps {
    id?: string;
    className?: string;
    slot_1_26933?: React.ReactNode;
}
const DarkModenothemepurpletypeonAccentsizesmall = (
    props: DarkModenothemepurpletypeonAccentsizesmallProps
) => {
    const { id, className = "", slot_1_26933 } = props;

    return (
        <div
            className={["component-1_26932", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26932"
                className="Pixso-symbol-1_26932 fill-light_backgroundbg_0-1_30126 pixso-relative-flex"
            >
                {slot_1_26933 ?? (
                    <p
                        id="1_26933"
                        className="Pixso-paragraph-1_26933 fill-purpleprimary-1_30121-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypeonAccentsizesmall;
