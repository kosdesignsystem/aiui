import "@/styles/DarkModenothemebluetypeonAccentsizesmall.css";
interface DarkModenothemebluetypeonAccentsizesmallProps {
    id?: string;
    className?: string;
    slot_1_26925?: React.ReactNode;
}
const DarkModenothemebluetypeonAccentsizesmall = (
    props: DarkModenothemebluetypeonAccentsizesmallProps
) => {
    const { id, className = "", slot_1_26925 } = props;

    return (
        <div
            className={["component-1_26924", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26924"
                className="Pixso-symbol-1_26924 fill-light_backgroundbg_0-1_30126 pixso-relative-flex"
            >
                {slot_1_26925 ?? (
                    <p
                        id="1_26925"
                        className="Pixso-paragraph-1_26925 fill-blueprimary-1_10439-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypeonAccentsizesmall;
