import Variantup from "@/components/Variantup";
import "@/styles/Sizesmallcontenttext.css";
interface SizesmallcontenttextProps {
    visible_17254_0?: boolean;
    id?: string;
    className?: string;
    slot_3078_6225?: React.ReactNode;
    slot_3078_6226?: React.ReactNode;
}
const Sizesmallcontenttext = (props: SizesmallcontenttextProps) => {
    const {
        visible_17254_0 = false,
        id,
        className = "",
        slot_3078_6225,
        slot_3078_6226
    } = props;

    return (
        <div
            className={["component-3078_6224", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6224"
                className="Pixso-symbol-3078_6224 pixso-relative-flex"
            >
                {slot_3078_6225 ?? (
                    <p
                        id="3078_6225"
                        className="Pixso-paragraph-3078_6225 text-regular14-1_10397 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"?"}
                    </p>
                )}
                {slot_3078_6226 ??
                    (visible_17254_0 && (
                        <Variantup
                            id="3078_6226"
                            className="Pixso-instance-3078_6226"
                        ></Variantup>
                    ))}
            </div>
        </div>
    );
};
export default Sizesmallcontenttext;
