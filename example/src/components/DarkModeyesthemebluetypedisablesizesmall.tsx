import "@/styles/DarkModeyesthemebluetypedisablesizesmall.css";
interface DarkModeyesthemebluetypedisablesizesmallProps {
    id?: string;
    className?: string;
    slot_1_26990?: React.ReactNode;
}
const DarkModeyesthemebluetypedisablesizesmall = (
    props: DarkModeyesthemebluetypedisablesizesmallProps
) => {
    const { id, className = "", slot_1_26990 } = props;

    return (
        <div
            className={["component-1_26989", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26989"
                className="Pixso-symbol-1_26989 fill-dark_contentplashka-1_30095 pixso-relative-flex"
            >
                {slot_1_26990 ?? (
                    <p
                        id="1_26990"
                        className="Pixso-paragraph-1_26990 fill-dark_contentdisabled-1_30129-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypedisablesizesmall;
