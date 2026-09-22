import Sizemediumcontenttext from "@/components/Sizemediumcontenttext";
import NewSwitch from "@/components/Newswitch";
import NewIconButton from "@/components/Newiconbutton";
import "@/styles/Multiplyselectedislongtexttrue.css";
interface MultiplyselectedislongtexttrueProps {
    visible_16866_6?: boolean;
    visible_16866_5?: boolean;
    visible_16866_7?: boolean;
    visible_16866_4?: boolean;
    id?: string;
    className?: string;
    slot_3078_6300?: React.ReactNode;
    slot_3078_6302?: React.ReactNode;
    slot_3078_6303?: React.ReactNode;
    slot_3078_6304?: React.ReactNode;
    slot_3078_6305?: React.ReactNode;
}
const Multiplyselectedislongtexttrue = (
    props: MultiplyselectedislongtexttrueProps
) => {
    const {
        visible_16866_6 = true,
        visible_16866_5 = true,
        visible_16866_7 = false,
        visible_16866_4 = false,
        id,
        className = "",
        slot_3078_6300,
        slot_3078_6302,
        slot_3078_6303,
        slot_3078_6304,
        slot_3078_6305
    } = props;

    return (
        <div
            className={["component-3078_6299", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6299"
                className="stroke-wrapper-3078_6299 pixso-relative-flex"
            >
                <div className="Pixso-symbol-3078_6299 pixso-relative-flex">
                    {slot_3078_6300 ??
                        (visible_16866_5 && (
                            <Sizemediumcontenttext
                                id="3078_6300"
                                className="Pixso-instance-3078_6300 pixso-relative-no-shrink"
                            ></Sizemediumcontenttext>
                        ))}
                    <div
                        id="3078_6301"
                        className="Pixso-frame-3078_6301 pixso-relative-flex pixso-h-auto"
                    >
                        <div className="frame-content-3078_6301 pixso-relative-flex">
                            {slot_3078_6302 ??
                                (visible_16866_6 && (
                                    <p
                                        id="3078_6302"
                                        className="Pixso-paragraph-3078_6302 pixso-relative-no-shrink pixso-h-auto"
                                    >
                                        {"Title"}
                                    </p>
                                ))}
                            {slot_3078_6303 ?? (
                                <p
                                    id="3078_6303"
                                    className="Pixso-paragraph-3078_6303 pixso-relative-no-shrink pixso-flex-auto-height"
                                >
                                    {
                                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed"
                                    }
                                </p>
                            )}
                        </div>
                    </div>
                    {slot_3078_6304 ??
                        (visible_16866_4 && (
                            <NewSwitch
                                id="3078_6304"
                                className="Pixso-instance-3078_6304 pixso-relative-no-shrink"
                            ></NewSwitch>
                        ))}
                    {slot_3078_6305 ??
                        (visible_16866_7 && (
                            <NewIconButton
                                id="3078_6305"
                                className="Pixso-instance-3078_6305 pixso-relative-no-shrink"
                            ></NewIconButton>
                        ))}
                </div>
                <div className="stroke-3078_6299"></div>
            </div>
        </div>
    );
};
export default Multiplyselectedislongtexttrue;
