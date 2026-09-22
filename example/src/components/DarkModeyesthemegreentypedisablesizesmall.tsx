import "@/styles/DarkModeyesthemegreentypedisablesizesmall.css";
interface DarkModeyesthemegreentypedisablesizesmallProps {
    id?: string;
    className?: string;
    slot_1_26994?: React.ReactNode;
}
const DarkModeyesthemegreentypedisablesizesmall = (
    props: DarkModeyesthemegreentypedisablesizesmallProps
) => {
    const { id, className = "", slot_1_26994 } = props;

    return (
        <div
            className={["component-1_26993", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26993"
                className="Pixso-symbol-1_26993 fill-dark_contentplashka-1_30095 pixso-relative-flex"
            >
                {slot_1_26994 ?? (
                    <p
                        id="1_26994"
                        className="Pixso-paragraph-1_26994 fill-dark_contentdisabled-1_30129-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypedisablesizesmall;
