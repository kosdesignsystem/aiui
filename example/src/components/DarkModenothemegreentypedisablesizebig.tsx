import "@/styles/DarkModenothemegreentypedisablesizebig.css";
interface DarkModenothemegreentypedisablesizebigProps {
    id?: string;
    className?: string;
    slot_1_26905?: React.ReactNode;
}
const DarkModenothemegreentypedisablesizebig = (
    props: DarkModenothemegreentypedisablesizebigProps
) => {
    const { id, className = "", slot_1_26905 } = props;

    return (
        <div
            className={["component-1_26904", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26904"
                className="Pixso-symbol-1_26904 fill-light_contentplashka-1_30125 pixso-relative-flex"
            >
                {slot_1_26905 ?? (
                    <p
                        id="1_26905"
                        className="Pixso-paragraph-1_26905 fill-light_contentdisabled-1_30128-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypedisablesizebig;
