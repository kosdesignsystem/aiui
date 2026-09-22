import "@/styles/DarkModenothemegreentypedisablesizesmall.css";
interface DarkModenothemegreentypedisablesizesmallProps {
    id?: string;
    className?: string;
    slot_1_26992?: React.ReactNode;
}
const DarkModenothemegreentypedisablesizesmall = (
    props: DarkModenothemegreentypedisablesizesmallProps
) => {
    const { id, className = "", slot_1_26992 } = props;

    return (
        <div
            className={["component-1_26991", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26991"
                className="Pixso-symbol-1_26991 fill-light_contentplashka-1_30125 pixso-relative-flex"
            >
                {slot_1_26992 ?? (
                    <p
                        id="1_26992"
                        className="Pixso-paragraph-1_26992 fill-light_contentdisabled-1_30128-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypedisablesizesmall;
