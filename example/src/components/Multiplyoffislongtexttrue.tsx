import Sizemediumcontenttext from "@/components/Sizemediumcontenttext";
import NewSwitch from "@/components/Newswitch";
import NewIconButton from "@/components/Newiconbutton";
import "@/styles/Multiplyoffislongtexttrue.css";
interface MultiplyoffislongtexttrueProps {
    visible_16866_6?: boolean;
    visible_16866_5?: boolean;
    visible_16866_7?: boolean;
    visible_16866_4?: boolean;
    id?: string;
    className?: string;
    slot_3078_6286?: React.ReactNode;
    slot_3078_6288?: React.ReactNode;
    slot_3078_6289?: React.ReactNode;
    slot_3078_6290?: React.ReactNode;
    slot_3078_6291?: React.ReactNode;
}
const Multiplyoffislongtexttrue = (props: MultiplyoffislongtexttrueProps) => {
    const {
        visible_16866_6 = true,
        visible_16866_5 = true,
        visible_16866_7 = false,
        visible_16866_4 = false,
        id,
        className = "",
        slot_3078_6286,
        slot_3078_6288,
        slot_3078_6289,
        slot_3078_6290,
        slot_3078_6291
    } = props;

    return (
        <div
            className={["component-3078_6285", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6285"
                className="Pixso-symbol-3078_6285 pixso-relative-flex"
            >
                {slot_3078_6286 ??
                    (visible_16866_5 && (
                        <Sizemediumcontenttext
                            id="3078_6286"
                            className="Pixso-instance-3078_6286 pixso-relative-no-shrink"
                        ></Sizemediumcontenttext>
                    ))}
                <div
                    id="3078_6287"
                    className="Pixso-frame-3078_6287 pixso-relative-flex pixso-h-auto"
                >
                    <div className="frame-content-3078_6287 pixso-relative-flex">
                        {slot_3078_6288 ??
                            (visible_16866_6 && (
                                <p
                                    id="3078_6288"
                                    className="Pixso-paragraph-3078_6288 text-newr14-3078_6176 pixso-relative-no-shrink pixso-h-auto"
                                >
                                    {"Title"}
                                </p>
                            ))}
                        {slot_3078_6289 ?? (
                            <p
                                id="3078_6289"
                                className="Pixso-paragraph-3078_6289 text-regular18-3078_6175 pixso-relative-no-shrink pixso-flex-auto-height"
                            >
                                {
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed"
                                }
                            </p>
                        )}
                    </div>
                </div>
                {slot_3078_6290 ??
                    (visible_16866_4 && (
                        <NewSwitch
                            id="3078_6290"
                            className="Pixso-instance-3078_6290 pixso-relative-no-shrink"
                        ></NewSwitch>
                    ))}
                {slot_3078_6291 ??
                    (visible_16866_7 && (
                        <NewIconButton
                            id="3078_6291"
                            className="Pixso-instance-3078_6291 pixso-relative-no-shrink"
                        ></NewIconButton>
                    ))}
            </div>
        </div>
    );
};
export default Multiplyoffislongtexttrue;
