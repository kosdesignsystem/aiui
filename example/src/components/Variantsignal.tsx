import "@/styles/Variantsignal.css";
interface VariantsignalProps {
    id?: string;
    className?: string;
    slot_3078_6207?: React.ReactNode;
}
const Variantsignal = (props: VariantsignalProps) => {
    const { id, className = "", slot_3078_6207 } = props;

    return (
        <div
            className={["component-3078_6206", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6206"
                className="Pixso-symbol-3078_6206 pixso-position-relative"
            >
                {slot_3078_6207 ?? (
                    <div
                        id="3078_6207"
                        className="Pixso-vector-3078_6207"
                    ></div>
                )}
            </div>
        </div>
    );
};
export default Variantsignal;
