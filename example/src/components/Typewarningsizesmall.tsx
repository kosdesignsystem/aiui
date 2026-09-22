import "@/styles/Typewarningsizesmall.css";
interface TypewarningsizesmallProps {
    id?: string;
    className?: string;
    slot_1_843?: React.ReactNode;
}
const Typewarningsizesmall = (props: TypewarningsizesmallProps) => {
    const { id, className = "", slot_1_843 } = props;

    return (
        <div
            className={["component-1_842", className].filter(Boolean).join(" ")}
            id={id}
        >
            <div id="1_842" className="Pixso-symbol-1_842 pixso-relative-flex">
                {slot_1_843 ?? (
                    <p
                        id="1_843"
                        className="Pixso-paragraph-1_843 text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default Typewarningsizesmall;
