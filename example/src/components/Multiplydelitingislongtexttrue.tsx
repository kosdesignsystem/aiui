import Multiplydeselectedislongtexttrue from "@/components/Multiplydeselectedislongtexttrue";
import Isoutlinefalse34 from "@/components/Isoutlinefalse34";
import "@/styles/Multiplydelitingislongtexttrue.css";
interface MultiplydelitingislongtexttrueProps {
    visible_16866_6?: boolean;
    visible_16866_5?: boolean;
    visible_16866_7?: boolean;
    visible_16866_4?: boolean;
    id?: string;
    className?: string;
    slot_3078_6307?: React.ReactNode;
    slot_3078_6308?: React.ReactNode;
}
const Multiplydelitingislongtexttrue = (
    props: MultiplydelitingislongtexttrueProps
) => {
    const {
        visible_16866_6 = true,
        visible_16866_5 = true,
        visible_16866_7 = false,
        visible_16866_4 = false,
        id,
        className = "",
        slot_3078_6307,
        slot_3078_6308
    } = props;

    return (
        <div
            className={["component-3078_6306", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6306"
                className="Pixso-symbol-3078_6306 pixso-relative-flex"
            >
                {slot_3078_6307 ?? (
                    <Multiplydeselectedislongtexttrue
                        id="3078_6307"
                        className="Pixso-instance-3078_6307 pixso-relative-no-shrink"
                    ></Multiplydeselectedislongtexttrue>
                )}
                {slot_3078_6308 ?? (
                    <Isoutlinefalse34
                        id="3078_6308"
                        className="Pixso-instance-3078_6308"
                    ></Isoutlinefalse34>
                )}
            </div>
        </div>
    );
};
export default Multiplydelitingislongtexttrue;
