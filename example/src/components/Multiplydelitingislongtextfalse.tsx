import Sizemediumcontenttext from "@/components/Sizemediumcontenttext";
import NewSwitch from "@/components/Newswitch";
import NewIconButton from "@/components/Newiconbutton";
import Isoutlinefalse34 from "@/components/Isoutlinefalse34";
import "@/styles/Multiplydelitingislongtextfalse.css";
interface MultiplydelitingislongtextfalseProps {
    visible_16866_6?: boolean;
    visible_16866_5?: boolean;
    visible_16866_7?: boolean;
    visible_16866_4?: boolean;
    id?: string;
    className?: string;
    slot_3078_6270?: React.ReactNode;
    slot_3078_6272?: React.ReactNode;
    slot_3078_6273?: React.ReactNode;
    slot_3078_6274?: React.ReactNode;
    slot_3078_6275?: React.ReactNode;
    slot_3078_6276?: React.ReactNode;
}
const Multiplydelitingislongtextfalse = (
    props: MultiplydelitingislongtextfalseProps
) => {
    const {
        visible_16866_6 = true,
        visible_16866_5 = true,
        visible_16866_7 = false,
        visible_16866_4 = false,
        id,
        className = "",
        slot_3078_6270,
        slot_3078_6272,
        slot_3078_6273,
        slot_3078_6274,
        slot_3078_6275,
        slot_3078_6276
    } = props;

    return (
        <div
            className={["component-3078_6268", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6268"
                className="Pixso-symbol-3078_6268 pixso-position-relative"
            >
                <div
                    id="3078_6269"
                    className="Pixso-frame-3078_6269 pixso-flex"
                >
                    <div className="frame-content-3078_6269 pixso-relative-flex">
                        {slot_3078_6270 ??
                            (visible_16866_5 && (
                                <Sizemediumcontenttext
                                    id="3078_6270"
                                    className="Pixso-instance-3078_6270 pixso-relative-no-shrink"
                                ></Sizemediumcontenttext>
                            ))}
                        <div
                            id="3078_6271"
                            className="Pixso-frame-3078_6271 pixso-relative-flex pixso-h-auto"
                        >
                            <div className="frame-content-3078_6271 pixso-relative-flex">
                                {slot_3078_6272 ?? (
                                    <p
                                        id="3078_6272"
                                        className="Pixso-paragraph-3078_6272 pixso-relative-no-shrink pixso-h-auto"
                                    >
                                        {"Title"}
                                    </p>
                                )}
                                {slot_3078_6273 ??
                                    (visible_16866_6 && (
                                        <p
                                            id="3078_6273"
                                            className="Pixso-paragraph-3078_6273 pixso-relative-no-shrink pixso-h-auto"
                                        >
                                            {"Subtitle"}
                                        </p>
                                    ))}
                            </div>
                        </div>
                        {slot_3078_6274 ??
                            (visible_16866_4 && (
                                <NewSwitch
                                    id="3078_6274"
                                    className="Pixso-instance-3078_6274 pixso-relative-no-shrink"
                                ></NewSwitch>
                            ))}
                        {slot_3078_6275 ??
                            (visible_16866_7 && (
                                <NewIconButton
                                    id="3078_6275"
                                    className="Pixso-instance-3078_6275 pixso-relative-no-shrink"
                                ></NewIconButton>
                            ))}
                    </div>
                </div>
                {slot_3078_6276 ?? (
                    <Isoutlinefalse34
                        id="3078_6276"
                        className="Pixso-instance-3078_6276"
                    ></Isoutlinefalse34>
                )}
            </div>
        </div>
    );
};
export default Multiplydelitingislongtextfalse;
