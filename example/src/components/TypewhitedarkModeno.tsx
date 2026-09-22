import "@/styles/TypewhitedarkModeno.css";
interface TypewhitedarkModenoProps {
    id?: string;
    className?: string;
    slot_3001_9782?: React.ReactNode;
}
const TypewhitedarkModeno = (props: TypewhitedarkModenoProps) => {
    const { id, className = "", slot_3001_9782 } = props;

    return (
        <div
            className={["component-3001_9781", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9781"
                className="Pixso-symbol-3001_9781 fill-lightbackgroundbg_1-3001_9760 pixso-relative-flex"
            >
                {slot_3001_9782 ?? (
                    <p
                        id="3001_9782"
                        className="Pixso-paragraph-3001_9782 fill-lightcontentprimary-1_10500-paragraph text-bold14-3001_9754 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default TypewhitedarkModeno;
