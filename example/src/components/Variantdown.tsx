import "@/styles/Variantdown.css";
interface VariantdownProps {
    id?: string;
    className?: string;
    slot_3078_6201?: React.ReactNode;
    slot_3078_6202?: React.ReactNode;
}
const Variantdown = (props: VariantdownProps) => {
    const { id, className = "", slot_3078_6201, slot_3078_6202 } = props;

    return (
        <div
            className={["component-3078_6200", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6200"
                className="Pixso-symbol-3078_6200 pixso-position-relative"
            >
                {slot_3078_6201 ?? (
                    <div
                        id="3078_6201"
                        className="Pixso-vector-3078_6201"
                    ></div>
                )}
                {slot_3078_6202 ?? (
                    <div
                        id="3078_6202"
                        className="Pixso-vector-3078_6202"
                    ></div>
                )}
            </div>
        </div>
    );
};
export default Variantdown;
