import "@/styles/TypebluedarkModeno.css";
interface TypebluedarkModenoProps {
    id?: string;
    className?: string;
    slot_3001_9770?: React.ReactNode;
}
const TypebluedarkModeno = (props: TypebluedarkModenoProps) => {
    const { id, className = "", slot_3001_9770 } = props;

    return (
        <div
            className={["component-3001_9769", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9769"
                className="Pixso-symbol-3001_9769 fill-lightsystemaccent_primary-3001_9751 pixso-relative-flex"
            >
                {slot_3001_9770 ?? (
                    <p
                        id="3001_9770"
                        className="Pixso-paragraph-3001_9770 fill-lightcontent_on_accentprimary-3001_9752-paragraph text-bold14-3001_9754 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default TypebluedarkModeno;
