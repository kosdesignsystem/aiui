import "@/styles/TypeltedarkModefalse.css";
interface TypeltedarkModefalseProps {
    id?: string;
    className?: string;
    slot_421_10517?: React.ReactNode;
}
const TypeltedarkModefalse = (props: TypeltedarkModefalseProps) => {
    const { id, className = "", slot_421_10517 } = props;

    return (
        <div
            className={["component-421_10512", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10512"
                className="Pixso-symbol-421_10512 pixso-relative-flex"
            >
                {slot_421_10517 ?? (
                    <p
                        id="421_10517"
                        className="Pixso-paragraph-421_10517 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"LTE"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default TypeltedarkModefalse;
