import "@/styles/Varianterror.css";
interface VarianterrorProps {
    id?: string;
    className?: string;
    slot_3078_6192?: React.ReactNode;
    slot_3078_6193?: React.ReactNode;
}
const Varianterror = (props: VarianterrorProps) => {
    const { id, className = "", slot_3078_6192, slot_3078_6193 } = props;

    return (
        <div
            className={["component-3078_6191", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6191"
                className="Pixso-symbol-3078_6191 pixso-position-relative"
            >
                {slot_3078_6192 ?? (
                    <div
                        id="3078_6192"
                        className="Pixso-vector-3078_6192"
                    ></div>
                )}
                {slot_3078_6193 ?? (
                    <div
                        id="3078_6193"
                        className="Pixso-vector-3078_6193"
                    ></div>
                )}
            </div>
        </div>
    );
};
export default Varianterror;
