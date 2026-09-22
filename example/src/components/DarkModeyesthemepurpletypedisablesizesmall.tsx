import "@/styles/DarkModeyesthemepurpletypedisablesizesmall.css";
interface DarkModeyesthemepurpletypedisablesizesmallProps {
    id?: string;
    className?: string;
    slot_1_26998?: React.ReactNode;
}
const DarkModeyesthemepurpletypedisablesizesmall = (
    props: DarkModeyesthemepurpletypedisablesizesmallProps
) => {
    const { id, className = "", slot_1_26998 } = props;

    return (
        <div
            className={["component-1_26997", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26997"
                className="Pixso-symbol-1_26997 fill-dark_contentplashka-1_30095 pixso-relative-flex"
            >
                {slot_1_26998 ?? (
                    <p
                        id="1_26998"
                        className="Pixso-paragraph-1_26998 fill-dark_contentdisabled-1_30129-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypedisablesizesmall;
