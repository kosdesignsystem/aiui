import "@/styles/DarkModeyesthemegreentypedisablesizebig.css";
interface DarkModeyesthemegreentypedisablesizebigProps {
    id?: string;
    className?: string;
    slot_1_26907?: React.ReactNode;
}
const DarkModeyesthemegreentypedisablesizebig = (
    props: DarkModeyesthemegreentypedisablesizebigProps
) => {
    const { id, className = "", slot_1_26907 } = props;

    return (
        <div
            className={["component-1_26906", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26906"
                className="Pixso-symbol-1_26906 fill-dark_contentplashka-1_30095 pixso-relative-flex"
            >
                {slot_1_26907 ?? (
                    <p
                        id="1_26907"
                        className="Pixso-paragraph-1_26907 fill-dark_contentdisabled-1_30129-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypedisablesizebig;
