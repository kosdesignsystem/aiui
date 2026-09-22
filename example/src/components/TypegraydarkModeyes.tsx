import "@/styles/TypegraydarkModeyes.css";
interface TypegraydarkModeyesProps {
    id?: string;
    className?: string;
    slot_3001_9792?: React.ReactNode;
}
const TypegraydarkModeyes = (props: TypegraydarkModeyesProps) => {
    const { id, className = "", slot_3001_9792 } = props;

    return (
        <div
            className={["component-3001_9791", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9791"
                className="Pixso-symbol-3001_9791 fill-darkcontentsecondary-3001_9763 pixso-relative-flex"
            >
                {slot_3001_9792 ?? (
                    <p
                        id="3001_9792"
                        className="Pixso-paragraph-3001_9792 fill-darkcontent_on_accentprimary-3001_9756-paragraph text-bold14-3001_9754 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default TypegraydarkModeyes;
