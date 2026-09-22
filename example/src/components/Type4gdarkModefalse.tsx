import "@/styles/Type4gdarkModefalse.css";
interface Type4gdarkModefalseProps {
    id?: string;
    className?: string;
    slot_421_10516?: React.ReactNode;
}
const Type4gdarkModefalse = (props: Type4gdarkModefalseProps) => {
    const { id, className = "", slot_421_10516 } = props;

    return (
        <div
            className={["component-421_10511", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10511"
                className="Pixso-symbol-421_10511 pixso-relative-flex"
            >
                {slot_421_10516 ?? (
                    <p
                        id="421_10516"
                        className="Pixso-paragraph-421_10516 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"4G"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default Type4gdarkModefalse;
