import "@/styles/DarkModenothemebluetypedisablesizesmall.css";
interface DarkModenothemebluetypedisablesizesmallProps {
    id?: string;
    className?: string;
    slot_1_26988?: React.ReactNode;
}
const DarkModenothemebluetypedisablesizesmall = (
    props: DarkModenothemebluetypedisablesizesmallProps
) => {
    const { id, className = "", slot_1_26988 } = props;

    return (
        <div
            className={["component-1_26987", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26987"
                className="Pixso-symbol-1_26987 fill-light_contentplashka-1_30125 pixso-relative-flex"
            >
                {slot_1_26988 ?? (
                    <p
                        id="1_26988"
                        className="Pixso-paragraph-1_26988 fill-light_contentdisabled-1_30128-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypedisablesizesmall;
