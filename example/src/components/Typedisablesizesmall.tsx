import "@/styles/Typedisablesizesmall.css";
interface TypedisablesizesmallProps {
    id?: string;
    className?: string;
    slot_1_847?: React.ReactNode;
}
const Typedisablesizesmall = (props: TypedisablesizesmallProps) => {
    const { id, className = "", slot_1_847 } = props;

    return (
        <div
            className={["component-1_846", className].filter(Boolean).join(" ")}
            id={id}
        >
            <div id="1_846" className="Pixso-symbol-1_846 pixso-relative-flex">
                {slot_1_847 ?? (
                    <p
                        id="1_847"
                        className="Pixso-paragraph-1_847 text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default Typedisablesizesmall;
