import "@/styles/DarkModeyesthemepurpletypeonAccentsizesmall.css";
interface DarkModeyesthemepurpletypeonAccentsizesmallProps {
    id?: string;
    className?: string;
    slot_1_26935?: React.ReactNode;
}
const DarkModeyesthemepurpletypeonAccentsizesmall = (
    props: DarkModeyesthemepurpletypeonAccentsizesmallProps
) => {
    const { id, className = "", slot_1_26935 } = props;

    return (
        <div
            className={["component-1_26934", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26934"
                className="Pixso-symbol-1_26934 fill-light_backgroundbg_0-1_30126 pixso-relative-flex"
            >
                {slot_1_26935 ?? (
                    <p
                        id="1_26935"
                        className="Pixso-paragraph-1_26935 fill-purpleprimary-1_30121-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypeonAccentsizesmall;
