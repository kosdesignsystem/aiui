import Multiplydeselectedislongtexttrue from "@/components/Multiplydeselectedislongtexttrue";
import "@/styles/Multiplymultiselectislongtexttrue.css";
interface MultiplymultiselectislongtexttrueProps {
    visible_16866_6?: boolean;
    visible_16866_5?: boolean;
    visible_16866_7?: boolean;
    visible_16866_4?: boolean;
    id?: string;
    className?: string;
    slot_3078_6310?: React.ReactNode;
}
const Multiplymultiselectislongtexttrue = (
    props: MultiplymultiselectislongtexttrueProps
) => {
    const {
        visible_16866_6 = true,
        visible_16866_5 = true,
        visible_16866_7 = false,
        visible_16866_4 = false,
        id,
        className = "",
        slot_3078_6310
    } = props;

    return (
        <div
            className={["component-3078_6309", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6309"
                className="Pixso-symbol-3078_6309 pixso-relative-flex"
            >
                {slot_3078_6310 ?? (
                    <Multiplydeselectedislongtexttrue
                        id="3078_6310"
                        className="Pixso-instance-3078_6310 pixso-relative-no-shrink"
                    ></Multiplydeselectedislongtexttrue>
                )}
            </div>
        </div>
    );
};
export default Multiplymultiselectislongtexttrue;
