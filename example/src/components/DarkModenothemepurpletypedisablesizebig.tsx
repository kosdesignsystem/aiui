import "@/styles/DarkModenothemepurpletypedisablesizebig.css";
interface DarkModenothemepurpletypedisablesizebigProps {
    id?: string;
    className?: string;
    slot_1_26909?: React.ReactNode;
}
const DarkModenothemepurpletypedisablesizebig = (
    props: DarkModenothemepurpletypedisablesizebigProps
) => {
    const { id, className = "", slot_1_26909 } = props;

    return (
        <div
            className={["component-1_26908", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26908"
                className="Pixso-symbol-1_26908 fill-light_contentplashka-1_30125 pixso-relative-flex"
            >
                {slot_1_26909 ?? (
                    <p
                        id="1_26909"
                        className="Pixso-paragraph-1_26909 fill-light_contentdisabled-1_30128-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypedisablesizebig;
