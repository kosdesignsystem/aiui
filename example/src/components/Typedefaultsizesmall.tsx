import "@/styles/Typedefaultsizesmall.css";
interface TypedefaultsizesmallProps {
    id?: string;
    className?: string;
    slot_1_845?: React.ReactNode;
}
const Typedefaultsizesmall = (props: TypedefaultsizesmallProps) => {
    const { id, className = "", slot_1_845 } = props;

    return (
        <div
            className={["component-1_844", className].filter(Boolean).join(" ")}
            id={id}
        >
            <div id="1_844" className="Pixso-symbol-1_844 pixso-relative-flex">
                {slot_1_845 ?? (
                    <p
                        id="1_845"
                        className="Pixso-paragraph-1_845 text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default Typedefaultsizesmall;
