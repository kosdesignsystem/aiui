import "@/styles/TypeonAccentdarkModeyes.css";
interface TypeonAccentdarkModeyesProps {
    id?: string;
    className?: string;
    slot_3001_9786?: React.ReactNode;
}
const TypeonAccentdarkModeyes = (props: TypeonAccentdarkModeyesProps) => {
    const { id, className = "", slot_3001_9786 } = props;

    return (
        <div
            className={["component-3001_9785", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9785"
                className="Pixso-symbol-3001_9785 fill-lightcontent_on_accentprimary-3001_9752 pixso-relative-flex"
            >
                {slot_3001_9786 ?? (
                    <p
                        id="3001_9786"
                        className="Pixso-paragraph-3001_9786 fill-darksystemaccent_primary-3001_9755-paragraph text-bold14-3001_9754 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default TypeonAccentdarkModeyes;
