import "@/styles/DarkModenothemebluetypedisablesizebig.css";
interface DarkModenothemebluetypedisablesizebigProps {
    id?: string;
    className?: string;
    slot_1_26901?: React.ReactNode;
}
const DarkModenothemebluetypedisablesizebig = (
    props: DarkModenothemebluetypedisablesizebigProps
) => {
    const { id, className = "", slot_1_26901 } = props;

    return (
        <div
            className={["component-1_26900", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26900"
                className="Pixso-symbol-1_26900 fill-light_contentplashka-1_30125 pixso-relative-flex"
            >
                {slot_1_26901 ?? (
                    <p
                        id="1_26901"
                        className="Pixso-paragraph-1_26901 fill-light_contentdisabled-1_30128-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypedisablesizebig;
