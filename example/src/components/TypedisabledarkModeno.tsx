import "@/styles/TypedisabledarkModeno.css";
interface TypedisabledarkModenoProps {
    id?: string;
    className?: string;
    slot_3001_9794?: React.ReactNode;
}
const TypedisabledarkModeno = (props: TypedisabledarkModenoProps) => {
    const { id, className = "", slot_3001_9794 } = props;

    return (
        <div
            className={["component-3001_9793", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9793"
                className="Pixso-symbol-3001_9793 fill-lightcontentborder_light-3001_9764 pixso-relative-flex"
            >
                {slot_3001_9794 ?? (
                    <p
                        id="3001_9794"
                        className="Pixso-paragraph-3001_9794 fill-lightcontentdisabled-3001_9765-paragraph text-bold14-3001_9754 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default TypedisabledarkModeno;
