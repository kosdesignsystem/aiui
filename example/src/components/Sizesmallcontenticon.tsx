import Isoutlinefalse27 from "@/components/Isoutlinefalse27";
import Variantup from "@/components/Variantup";
import "@/styles/Sizesmallcontenticon.css";
interface SizesmallcontenticonProps {
    visible_17254_0?: boolean;
    id?: string;
    className?: string;
    slot_3078_6234?: React.ReactNode;
    slot_3078_6235?: React.ReactNode;
}
const Sizesmallcontenticon = (props: SizesmallcontenticonProps) => {
    const {
        visible_17254_0 = false,
        id,
        className = "",
        slot_3078_6234,
        slot_3078_6235
    } = props;

    return (
        <div
            className={["component-3078_6233", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6233"
                className="Pixso-symbol-3078_6233 pixso-relative-flex"
            >
                {slot_3078_6234 ?? (
                    <Isoutlinefalse27
                        id="3078_6234"
                        className="Pixso-instance-3078_6234 pixso-relative-no-shrink"
                    ></Isoutlinefalse27>
                )}
                {slot_3078_6235 ??
                    (visible_17254_0 && (
                        <Variantup
                            id="3078_6235"
                            className="Pixso-instance-3078_6235"
                        ></Variantup>
                    ))}
            </div>
        </div>
    );
};
export default Sizesmallcontenticon;
