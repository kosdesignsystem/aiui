import "@/styles/TypegraydarkModeno.css";
interface TypegraydarkModenoProps {
    id?: string;
    className?: string;
    slot_3001_9790?: React.ReactNode;
}
const TypegraydarkModeno = (props: TypegraydarkModenoProps) => {
    const { id, className = "", slot_3001_9790 } = props;

    return (
        <div
            className={["component-3001_9789", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9789"
                className="Pixso-symbol-3001_9789 fill-lightcontentsecondary-3001_9762 pixso-relative-flex"
            >
                {slot_3001_9790 ?? (
                    <p
                        id="3001_9790"
                        className="Pixso-paragraph-3001_9790 fill-lightcontent_on_accentprimary-3001_9752-paragraph text-bold14-3001_9754 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default TypegraydarkModeno;
