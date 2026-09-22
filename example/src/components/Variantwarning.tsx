import "@/styles/Variantwarning.css";
interface VariantwarningProps {
    id?: string;
    className?: string;
    slot_3078_6189?: React.ReactNode;
    slot_3078_6190?: React.ReactNode;
}
const Variantwarning = (props: VariantwarningProps) => {
    const { id, className = "", slot_3078_6189, slot_3078_6190 } = props;

    return (
        <div
            className={["component-3078_6188", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6188"
                className="Pixso-symbol-3078_6188 pixso-position-relative"
            >
                {slot_3078_6189 ?? (
                    <div
                        id="3078_6189"
                        className="Pixso-vector-3078_6189"
                    ></div>
                )}
                {slot_3078_6190 ?? (
                    <div
                        id="3078_6190"
                        className="Pixso-vector-3078_6190"
                    ></div>
                )}
            </div>
        </div>
    );
};
export default Variantwarning;
