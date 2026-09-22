import "@/styles/DarkModeyesthemepurpletypedisablesizebig.css";
interface DarkModeyesthemepurpletypedisablesizebigProps {
    id?: string;
    className?: string;
    slot_1_26911?: React.ReactNode;
}
const DarkModeyesthemepurpletypedisablesizebig = (
    props: DarkModeyesthemepurpletypedisablesizebigProps
) => {
    const { id, className = "", slot_1_26911 } = props;

    return (
        <div
            className={["component-1_26910", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26910"
                className="Pixso-symbol-1_26910 fill-dark_contentplashka-1_30095 pixso-relative-flex"
            >
                {slot_1_26911 ?? (
                    <p
                        id="1_26911"
                        className="Pixso-paragraph-1_26911 fill-dark_contentdisabled-1_30129-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypedisablesizebig;
