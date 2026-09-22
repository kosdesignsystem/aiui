import "@/styles/DarkModeyesthemebluetypeonAccentsizesmall.css";
interface DarkModeyesthemebluetypeonAccentsizesmallProps {
    id?: string;
    className?: string;
    slot_1_26927?: React.ReactNode;
}
const DarkModeyesthemebluetypeonAccentsizesmall = (
    props: DarkModeyesthemebluetypeonAccentsizesmallProps
) => {
    const { id, className = "", slot_1_26927 } = props;

    return (
        <div
            className={["component-1_26926", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26926"
                className="Pixso-symbol-1_26926 fill-light_backgroundbg_0-1_30126 pixso-relative-flex"
            >
                {slot_1_26927 ?? (
                    <p
                        id="1_26927"
                        className="Pixso-paragraph-1_26927 fill-blueprimary-1_10439-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypeonAccentsizesmall;
