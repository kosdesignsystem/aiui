import "@/styles/Variantup.css";
interface VariantupProps {
    id?: string;
    className?: string;
    slot_3078_6198?: React.ReactNode;
    slot_3078_6199?: React.ReactNode;
}
const Variantup = (props: VariantupProps) => {
    const { id, className = "", slot_3078_6198, slot_3078_6199 } = props;

    return (
        <div
            className={["component-3078_6197", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6197"
                className="Pixso-symbol-3078_6197 pixso-position-relative"
            >
                {slot_3078_6198 ?? (
                    <div
                        id="3078_6198"
                        className="Pixso-vector-3078_6198"
                    ></div>
                )}
                {slot_3078_6199 ?? (
                    <div
                        id="3078_6199"
                        className="Pixso-vector-3078_6199"
                    ></div>
                )}
            </div>
        </div>
    );
};
export default Variantup;
