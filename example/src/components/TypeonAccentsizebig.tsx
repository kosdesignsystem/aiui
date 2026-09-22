import "@/styles/TypeonAccentsizebig.css";
interface TypeonAccentsizebigProps {
    id?: string;
    className?: string;
    slot_1_823?: React.ReactNode;
}
const TypeonAccentsizebig = (props: TypeonAccentsizebigProps) => {
    const { id, className = "", slot_1_823 } = props;

    return (
        <div
            className={["component-1_822", className].filter(Boolean).join(" ")}
            id={id}
        >
            <div id="1_822" className="Pixso-symbol-1_822 pixso-relative-flex">
                {slot_1_823 ?? (
                    <p
                        id="1_823"
                        className="Pixso-paragraph-1_823 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default TypeonAccentsizebig;
