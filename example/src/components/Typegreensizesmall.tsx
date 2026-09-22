import "@/styles/Typegreensizesmall.css";
interface TypegreensizesmallProps {
    id?: string;
    className?: string;
    slot_1_841?: React.ReactNode;
}
const Typegreensizesmall = (props: TypegreensizesmallProps) => {
    const { id, className = "", slot_1_841 } = props;

    return (
        <div
            className={["component-1_840", className].filter(Boolean).join(" ")}
            id={id}
        >
            <div id="1_840" className="Pixso-symbol-1_840 pixso-relative-flex">
                {slot_1_841 ?? (
                    <p
                        id="1_841"
                        className="Pixso-paragraph-1_841 text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default Typegreensizesmall;
