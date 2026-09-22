import "@/styles/TypedisabledarkModeyes.css";
interface TypedisabledarkModeyesProps {
    id?: string;
    className?: string;
    slot_3001_9796?: React.ReactNode;
}
const TypedisabledarkModeyes = (props: TypedisabledarkModeyesProps) => {
    const { id, className = "", slot_3001_9796 } = props;

    return (
        <div
            className={["component-3001_9795", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9795"
                className="Pixso-symbol-3001_9795 fill-darkcontentborder_light-3001_9766 pixso-relative-flex"
            >
                {slot_3001_9796 ?? (
                    <p
                        id="3001_9796"
                        className="Pixso-paragraph-3001_9796 fill-darkcontentdisabled-3001_9767-paragraph text-bold14-3001_9754 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default TypedisabledarkModeyes;
