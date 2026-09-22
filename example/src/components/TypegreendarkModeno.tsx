import "@/styles/TypegreendarkModeno.css";
interface TypegreendarkModenoProps {
    id?: string;
    className?: string;
    slot_3001_9778?: React.ReactNode;
}
const TypegreendarkModeno = (props: TypegreendarkModenoProps) => {
    const { id, className = "", slot_3001_9778 } = props;

    return (
        <div
            className={["component-3001_9777", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9777"
                className="Pixso-symbol-3001_9777 fill-lightsystemsucess_primary-3001_9758 pixso-relative-flex"
            >
                {slot_3001_9778 ?? (
                    <p
                        id="3001_9778"
                        className="Pixso-paragraph-3001_9778 fill-lightcontent_on_accentprimary-3001_9752-paragraph text-bold14-3001_9754 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default TypegreendarkModeno;
