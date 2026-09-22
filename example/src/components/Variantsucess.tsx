import "@/styles/Variantsucess.css";
interface VariantsucessProps {
    id?: string;
    className?: string;
    slot_3078_6186?: React.ReactNode;
    slot_3078_6187?: React.ReactNode;
}
const Variantsucess = (props: VariantsucessProps) => {
    const { id, className = "", slot_3078_6186, slot_3078_6187 } = props;

    return (
        <div
            className={["component-3078_6185", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6185"
                className="Pixso-symbol-3078_6185 pixso-position-relative"
            >
                {slot_3078_6186 ?? (
                    <div
                        id="3078_6186"
                        className="Pixso-vector-3078_6186"
                    ></div>
                )}
                {slot_3078_6187 ?? (
                    <div
                        id="3078_6187"
                        className="Pixso-vector-3078_6187"
                    ></div>
                )}
            </div>
        </div>
    );
};
export default Variantsucess;
