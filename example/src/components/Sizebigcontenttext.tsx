import Variantup from "@/components/Variantup";
import "@/styles/Sizebigcontenttext.css";
interface SizebigcontenttextProps {
    visible_17254_0?: boolean;
    id?: string;
    className?: string;
    slot_3078_6219?: React.ReactNode;
    slot_3078_6220?: React.ReactNode;
}
const Sizebigcontenttext = (props: SizebigcontenttextProps) => {
    const {
        visible_17254_0 = false,
        id,
        className = "",
        slot_3078_6219,
        slot_3078_6220
    } = props;

    return (
        <div
            className={["component-3078_6218", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6218"
                className="Pixso-symbol-3078_6218 pixso-relative-flex"
            >
                {slot_3078_6219 ?? (
                    <p
                        id="3078_6219"
                        className="Pixso-paragraph-3078_6219 text-regular24-84_808 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"?"}
                    </p>
                )}
                {slot_3078_6220 ??
                    (visible_17254_0 && (
                        <Variantup
                            id="3078_6220"
                            className="Pixso-instance-3078_6220"
                        ></Variantup>
                    ))}
            </div>
        </div>
    );
};
export default Sizebigcontenttext;
