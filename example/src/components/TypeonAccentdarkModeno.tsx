import "@/styles/TypeonAccentdarkModeno.css";
interface TypeonAccentdarkModenoProps {
    id?: string;
    className?: string;
    slot_3001_9784?: React.ReactNode;
}
const TypeonAccentdarkModeno = (props: TypeonAccentdarkModenoProps) => {
    const { id, className = "", slot_3001_9784 } = props;

    return (
        <div
            className={["component-3001_9783", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9783"
                className="Pixso-symbol-3001_9783 fill-lightcontent_on_accentprimary-3001_9752 pixso-relative-flex"
            >
                {slot_3001_9784 ?? (
                    <p
                        id="3001_9784"
                        className="Pixso-paragraph-3001_9784 fill-lightsystemaccent_primary-3001_9751-paragraph text-bold14-3001_9754 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default TypeonAccentdarkModeno;
