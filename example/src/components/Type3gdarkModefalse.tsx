import "@/styles/Type3gdarkModefalse.css";
interface Type3gdarkModefalseProps {
    id?: string;
    className?: string;
    slot_421_10515?: React.ReactNode;
}
const Type3gdarkModefalse = (props: Type3gdarkModefalseProps) => {
    const { id, className = "", slot_421_10515 } = props;

    return (
        <div
            className={["component-421_10510", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10510"
                className="Pixso-symbol-421_10510 pixso-relative-flex"
            >
                {slot_421_10515 ?? (
                    <p
                        id="421_10515"
                        className="Pixso-paragraph-421_10515 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"3G"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default Type3gdarkModefalse;
