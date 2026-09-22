import "@/styles/Variantfavorite.css";
interface VariantfavoriteProps {
    id?: string;
    className?: string;
    slot_3078_6204?: React.ReactNode;
    slot_3078_6205?: React.ReactNode;
}
const Variantfavorite = (props: VariantfavoriteProps) => {
    const { id, className = "", slot_3078_6204, slot_3078_6205 } = props;

    return (
        <div
            className={["component-3078_6203", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6203"
                className="Pixso-symbol-3078_6203 pixso-position-relative"
            >
                {slot_3078_6204 ?? (
                    <div
                        id="3078_6204"
                        className="Pixso-vector-3078_6204"
                    ></div>
                )}
                {slot_3078_6205 ?? (
                    <div
                        id="3078_6205"
                        className="Pixso-vector-3078_6205"
                    ></div>
                )}
            </div>
        </div>
    );
};
export default Variantfavorite;
