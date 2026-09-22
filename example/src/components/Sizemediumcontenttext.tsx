import Variantup from "@/components/Variantup";
import "@/styles/Sizemediumcontenttext.css";
interface SizemediumcontenttextProps {
    visible_17254_0?: boolean;
    id?: string;
    className?: string;
    slot_3078_6222?: React.ReactNode;
    slot_3078_6223?: React.ReactNode;
}
const Sizemediumcontenttext = (props: SizemediumcontenttextProps) => {
    const {
        visible_17254_0 = false,
        id,
        className = "",
        slot_3078_6222,
        slot_3078_6223
    } = props;

    return (
        <div
            className={["component-3078_6221", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6221"
                className="Pixso-symbol-3078_6221 pixso-relative-flex"
            >
                {slot_3078_6222 ?? (
                    <p
                        id="3078_6222"
                        className="Pixso-paragraph-3078_6222 text-regular16-421_9277 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"?"}
                    </p>
                )}
                {slot_3078_6223 ??
                    (visible_17254_0 && (
                        <Variantup
                            id="3078_6223"
                            className="Pixso-instance-3078_6223"
                        ></Variantup>
                    ))}
            </div>
        </div>
    );
};
export default Sizemediumcontenttext;
