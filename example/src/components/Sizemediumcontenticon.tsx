import Isoutlinefalse27 from "@/components/Isoutlinefalse27";
import Variantup from "@/components/Variantup";
import "@/styles/Sizemediumcontenticon.css";
interface SizemediumcontenticonProps {
    visible_17254_0?: boolean;
    id?: string;
    className?: string;
    slot_3078_6231?: React.ReactNode;
    slot_3078_6232?: React.ReactNode;
}
const Sizemediumcontenticon = (props: SizemediumcontenticonProps) => {
    const {
        visible_17254_0 = false,
        id,
        className = "",
        slot_3078_6231,
        slot_3078_6232
    } = props;

    return (
        <div
            className={["component-3078_6230", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6230"
                className="Pixso-symbol-3078_6230 pixso-relative-flex"
            >
                {slot_3078_6231 ?? (
                    <Isoutlinefalse27
                        id="3078_6231"
                        className="Pixso-instance-3078_6231 pixso-relative-no-shrink"
                    ></Isoutlinefalse27>
                )}
                {slot_3078_6232 ??
                    (visible_17254_0 && (
                        <Variantup
                            id="3078_6232"
                            className="Pixso-instance-3078_6232"
                        ></Variantup>
                    ))}
            </div>
        </div>
    );
};
export default Sizemediumcontenticon;
