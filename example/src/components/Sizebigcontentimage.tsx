import Variantup from "@/components/Variantup";
import "@/styles/Sizebigcontentimage.css";
interface SizebigcontentimageProps {
    visible_17254_0?: boolean;
    id?: string;
    className?: string;
    slot_3078_6211?: React.ReactNode;
}
const Sizebigcontentimage = (props: SizebigcontentimageProps) => {
    const {
        visible_17254_0 = false,
        id,
        className = "",
        slot_3078_6211
    } = props;

    return (
        <div
            className={["component-3078_6209", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6209"
                className="stroke-wrapper-3078_6209 pixso-position-relative"
            >
                <div className="Pixso-symbol-3078_6209 pixso-position-relative">
                    <div
                        id="3078_6210"
                        className="Pixso-rectangle-3078_6210"
                    ></div>
                    {slot_3078_6211 ??
                        (visible_17254_0 && (
                            <Variantup
                                id="3078_6211"
                                className="Pixso-instance-3078_6211"
                            ></Variantup>
                        ))}
                </div>
                <div className="stroke-3078_6209"></div>
            </div>
        </div>
    );
};
export default Sizebigcontentimage;
