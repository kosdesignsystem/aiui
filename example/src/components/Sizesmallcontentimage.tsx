import Variantup from "@/components/Variantup";
import "@/styles/Sizesmallcontentimage.css";
interface SizesmallcontentimageProps {
    visible_17254_0?: boolean;
    id?: string;
    className?: string;
    slot_3078_6217?: React.ReactNode;
}
const Sizesmallcontentimage = (props: SizesmallcontentimageProps) => {
    const {
        visible_17254_0 = false,
        id,
        className = "",
        slot_3078_6217
    } = props;

    return (
        <div
            className={["component-3078_6215", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6215"
                className="stroke-wrapper-3078_6215 pixso-position-relative"
            >
                <div className="Pixso-symbol-3078_6215 pixso-position-relative">
                    <div
                        id="3078_6216"
                        className="Pixso-rectangle-3078_6216"
                    ></div>
                    {slot_3078_6217 ??
                        (visible_17254_0 && (
                            <Variantup
                                id="3078_6217"
                                className="Pixso-instance-3078_6217"
                            ></Variantup>
                        ))}
                </div>
                <div className="stroke-3078_6215"></div>
            </div>
        </div>
    );
};
export default Sizesmallcontentimage;
