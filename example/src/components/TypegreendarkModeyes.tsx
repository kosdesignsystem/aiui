import "@/styles/TypegreendarkModeyes.css";
interface TypegreendarkModeyesProps {
    id?: string;
    className?: string;
    slot_3001_9780?: React.ReactNode;
}
const TypegreendarkModeyes = (props: TypegreendarkModeyesProps) => {
    const { id, className = "", slot_3001_9780 } = props;

    return (
        <div
            className={["component-3001_9779", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9779"
                className="Pixso-symbol-3001_9779 fill-darksystemsuccess_primary-3001_9759 pixso-relative-flex"
            >
                {slot_3001_9780 ?? (
                    <p
                        id="3001_9780"
                        className="Pixso-paragraph-3001_9780 fill-darkcontent_on_accentprimary-3001_9756-paragraph text-bold14-3001_9754 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default TypegreendarkModeyes;
