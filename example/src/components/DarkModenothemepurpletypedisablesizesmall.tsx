import "@/styles/DarkModenothemepurpletypedisablesizesmall.css";
interface DarkModenothemepurpletypedisablesizesmallProps {
    id?: string;
    className?: string;
    slot_1_26996?: React.ReactNode;
}
const DarkModenothemepurpletypedisablesizesmall = (
    props: DarkModenothemepurpletypedisablesizesmallProps
) => {
    const { id, className = "", slot_1_26996 } = props;

    return (
        <div
            className={["component-1_26995", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26995"
                className="Pixso-symbol-1_26995 fill-light_contentplashka-1_30125 pixso-relative-flex"
            >
                {slot_1_26996 ?? (
                    <p
                        id="1_26996"
                        className="Pixso-paragraph-1_26996 fill-light_contentdisabled-1_30128-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypedisablesizesmall;
