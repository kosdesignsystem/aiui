import "@/styles/TypegprsdarkModefalse.css";
interface TypegprsdarkModefalseProps {
    id?: string;
    className?: string;
    slot_421_10513?: React.ReactNode;
}
const TypegprsdarkModefalse = (props: TypegprsdarkModefalseProps) => {
    const { id, className = "", slot_421_10513 } = props;

    return (
        <div
            className={["component-421_10508", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10508"
                className="Pixso-symbol-421_10508 pixso-relative-flex"
            >
                {slot_421_10513 ?? (
                    <p
                        id="421_10513"
                        className="Pixso-paragraph-421_10513 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"GPRS"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default TypegprsdarkModefalse;
