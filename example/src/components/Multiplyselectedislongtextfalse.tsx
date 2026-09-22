import Sizemediumcontenttext from "@/components/Sizemediumcontenttext";
import NewSwitch from "@/components/Newswitch";
import NewIconButton from "@/components/Newiconbutton";
import "@/styles/Multiplyselectedislongtextfalse.css";
interface MultiplyselectedislongtextfalseProps {
    visible_16866_6?: boolean;
    visible_16866_5?: boolean;
    visible_16866_7?: boolean;
    visible_16866_4?: boolean;
    id?: string;
    className?: string;
    slot_3078_6262?: React.ReactNode;
    slot_3078_6264?: React.ReactNode;
    slot_3078_6265?: React.ReactNode;
    slot_3078_6266?: React.ReactNode;
    slot_3078_6267?: React.ReactNode;
}
const Multiplyselectedislongtextfalse = (
    props: MultiplyselectedislongtextfalseProps
) => {
    const {
        visible_16866_6 = true,
        visible_16866_5 = true,
        visible_16866_7 = false,
        visible_16866_4 = false,
        id,
        className = "",
        slot_3078_6262,
        slot_3078_6264,
        slot_3078_6265,
        slot_3078_6266,
        slot_3078_6267
    } = props;

    return (
        <div
            className={["component-3078_6261", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6261"
                className="stroke-wrapper-3078_6261 pixso-relative-flex"
            >
                <div className="Pixso-symbol-3078_6261 pixso-relative-flex">
                    {slot_3078_6262 ??
                        (visible_16866_5 && (
                            <Sizemediumcontenttext
                                id="3078_6262"
                                className="Pixso-instance-3078_6262 pixso-relative-no-shrink"
                            ></Sizemediumcontenttext>
                        ))}
                    <div
                        id="3078_6263"
                        className="Pixso-frame-3078_6263 pixso-relative-flex pixso-h-auto"
                    >
                        <div className="frame-content-3078_6263 pixso-relative-flex">
                            {slot_3078_6264 ?? (
                                <p
                                    id="3078_6264"
                                    className="Pixso-paragraph-3078_6264 pixso-relative-no-shrink pixso-h-auto"
                                >
                                    {"Title"}
                                </p>
                            )}
                            {slot_3078_6265 ??
                                (visible_16866_6 && (
                                    <p
                                        id="3078_6265"
                                        className="Pixso-paragraph-3078_6265 pixso-relative-no-shrink pixso-h-auto"
                                    >
                                        {"Subtitle"}
                                    </p>
                                ))}
                        </div>
                    </div>
                    {slot_3078_6266 ??
                        (visible_16866_4 && (
                            <NewSwitch
                                id="3078_6266"
                                className="Pixso-instance-3078_6266 pixso-relative-no-shrink"
                            ></NewSwitch>
                        ))}
                    {slot_3078_6267 ??
                        (visible_16866_7 && (
                            <NewIconButton
                                id="3078_6267"
                                className="Pixso-instance-3078_6267 pixso-relative-no-shrink"
                            ></NewIconButton>
                        ))}
                </div>
                <div className="stroke-3078_6261"></div>
            </div>
        </div>
    );
};
export default Multiplyselectedislongtextfalse;
