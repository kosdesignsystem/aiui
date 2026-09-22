import Isoutlinefalse27 from "@/components/Isoutlinefalse27";
import Variantup from "@/components/Variantup";
import "@/styles/Sizebigcontenticon.css";
interface SizebigcontenticonProps {
    visible_17254_0?: boolean;
    id?: string;
    className?: string;
    slot_3078_6228?: React.ReactNode;
    slot_3078_6229?: React.ReactNode;
}
const Sizebigcontenticon = (props: SizebigcontenticonProps) => {
    const {
        visible_17254_0 = false,
        id,
        className = "",
        slot_3078_6228,
        slot_3078_6229
    } = props;

    return (
        <div
            className={["component-3078_6227", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6227"
                className="Pixso-symbol-3078_6227 pixso-relative-flex"
            >
                {slot_3078_6228 ?? (
                    <Isoutlinefalse27
                        id="3078_6228"
                        className="Pixso-instance-3078_6228 pixso-relative-no-shrink"
                    ></Isoutlinefalse27>
                )}
                {slot_3078_6229 ??
                    (visible_17254_0 && (
                        <Variantup
                            id="3078_6229"
                            className="Pixso-instance-3078_6229"
                        ></Variantup>
                    ))}
            </div>
        </div>
    );
};
export default Sizebigcontenticon;
