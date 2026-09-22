import "@/styles/TypeedgedarkModefalse.css";
interface TypeedgedarkModefalseProps {
    id?: string;
    className?: string;
    slot_421_10514?: React.ReactNode;
}
const TypeedgedarkModefalse = (props: TypeedgedarkModefalseProps) => {
    const { id, className = "", slot_421_10514 } = props;

    return (
        <div
            className={["component-421_10509", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10509"
                className="Pixso-symbol-421_10509 pixso-relative-flex"
            >
                {slot_421_10514 ?? (
                    <p
                        id="421_10514"
                        className="Pixso-paragraph-421_10514 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"EDGE"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default TypeedgedarkModefalse;
