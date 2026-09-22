import "@/styles/TypewhitedarkModeyes.css";
interface TypewhitedarkModeyesProps {
    id?: string;
    className?: string;
    slot_3001_9788?: React.ReactNode;
}
const TypewhitedarkModeyes = (props: TypewhitedarkModeyesProps) => {
    const { id, className = "", slot_3001_9788 } = props;

    return (
        <div
            className={["component-3001_9787", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9787"
                className="Pixso-symbol-3001_9787 fill-darkbackgroundbg_1-3001_9761 pixso-relative-flex"
            >
                {slot_3001_9788 ?? (
                    <p
                        id="3001_9788"
                        className="Pixso-paragraph-3001_9788 fill-darkcontentprimary-1_10409-paragraph text-bold14-3001_9754 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default TypewhitedarkModeyes;
