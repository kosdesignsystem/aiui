import "@/styles/Variantremove.css";
interface VariantremoveProps {
    id?: string;
    className?: string;
    slot_3078_6195?: React.ReactNode;
    slot_3078_6196?: React.ReactNode;
}
const Variantremove = (props: VariantremoveProps) => {
    const { id, className = "", slot_3078_6195, slot_3078_6196 } = props;

    return (
        <div
            className={["component-3078_6194", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6194"
                className="Pixso-symbol-3078_6194 pixso-position-relative"
            >
                {slot_3078_6195 ?? (
                    <div
                        id="3078_6195"
                        className="Pixso-vector-3078_6195"
                    ></div>
                )}
                {slot_3078_6196 ?? (
                    <div
                        id="3078_6196"
                        className="Pixso-vector-3078_6196"
                    ></div>
                )}
            </div>
        </div>
    );
};
export default Variantremove;
