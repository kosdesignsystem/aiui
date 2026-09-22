import "@/styles/TypebluedarkModeyes.css";
interface TypebluedarkModeyesProps {
    id?: string;
    className?: string;
    slot_3001_9772?: React.ReactNode;
}
const TypebluedarkModeyes = (props: TypebluedarkModeyesProps) => {
    const { id, className = "", slot_3001_9772 } = props;

    return (
        <div
            className={["component-3001_9771", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9771"
                className="Pixso-symbol-3001_9771 fill-darksystemaccent_primary-3001_9755 pixso-relative-flex"
            >
                {slot_3001_9772 ?? (
                    <p
                        id="3001_9772"
                        className="Pixso-paragraph-3001_9772 fill-darkcontent_on_accentprimary-3001_9756-paragraph text-bold14-3001_9754 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default TypebluedarkModeyes;
