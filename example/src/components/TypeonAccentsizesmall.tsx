import "@/styles/TypeonAccentsizesmall.css";
interface TypeonAccentsizesmallProps {
    id?: string;
    className?: string;
    slot_1_837?: React.ReactNode;
}
const TypeonAccentsizesmall = (props: TypeonAccentsizesmallProps) => {
    const { id, className = "", slot_1_837 } = props;

    return (
        <div
            className={["component-1_836", className].filter(Boolean).join(" ")}
            id={id}
        >
            <div id="1_836" className="Pixso-symbol-1_836 pixso-relative-flex">
                {slot_1_837 ?? (
                    <p
                        id="1_837"
                        className="Pixso-paragraph-1_837 text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default TypeonAccentsizesmall;
