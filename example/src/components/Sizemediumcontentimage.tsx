import Variantup from "@/components/Variantup";
import "@/styles/Sizemediumcontentimage.css";
interface SizemediumcontentimageProps {
    visible_17254_0?: boolean;
    id?: string;
    className?: string;
    slot_3078_6214?: React.ReactNode;
}
const Sizemediumcontentimage = (props: SizemediumcontentimageProps) => {
    const {
        visible_17254_0 = false,
        id,
        className = "",
        slot_3078_6214
    } = props;

    return (
        <div
            className={["component-3078_6212", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6212"
                className="stroke-wrapper-3078_6212 pixso-position-relative"
            >
                <div className="Pixso-symbol-3078_6212 pixso-position-relative">
                    <div
                        id="3078_6213"
                        className="Pixso-rectangle-3078_6213"
                    ></div>
                    {slot_3078_6214 ??
                        (visible_17254_0 && (
                            <Variantup
                                id="3078_6214"
                                className="Pixso-instance-3078_6214"
                            ></Variantup>
                        ))}
                </div>
                <div className="stroke-3078_6212"></div>
            </div>
        </div>
    );
};
export default Sizemediumcontentimage;
