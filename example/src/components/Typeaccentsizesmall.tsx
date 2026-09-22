import "@/styles/Typeaccentsizesmall.css";
interface TypeaccentsizesmallProps {
    id?: string;
    className?: string;
    slot_1_835?: React.ReactNode;
}
const Typeaccentsizesmall = (props: TypeaccentsizesmallProps) => {
    const { id, className = "", slot_1_835 } = props;

    return (
        <div
            className={["component-1_834", className].filter(Boolean).join(" ")}
            id={id}
        >
            <div id="1_834" className="Pixso-symbol-1_834 pixso-relative-flex">
                {slot_1_835 ?? (
                    <p
                        id="1_835"
                        className="Pixso-paragraph-1_835 text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default Typeaccentsizesmall;
