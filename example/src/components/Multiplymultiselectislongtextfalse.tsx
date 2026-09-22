import Sizemediumcontenttext from "@/components/Sizemediumcontenttext";
import NewSwitch from "@/components/Newswitch";
import NewIconButton from "@/components/Newiconbutton";
import "@/styles/Multiplymultiselectislongtextfalse.css";
interface MultiplymultiselectislongtextfalseProps {
    visible_16866_6?: boolean;
    visible_16866_5?: boolean;
    visible_16866_7?: boolean;
    visible_16866_4?: boolean;
    id?: string;
    className?: string;
    slot_3078_6279?: React.ReactNode;
    slot_3078_6281?: React.ReactNode;
    slot_3078_6282?: React.ReactNode;
    slot_3078_6283?: React.ReactNode;
    slot_3078_6284?: React.ReactNode;
}
const Multiplymultiselectislongtextfalse = (
    props: MultiplymultiselectislongtextfalseProps
) => {
    const {
        visible_16866_6 = true,
        visible_16866_5 = true,
        visible_16866_7 = false,
        visible_16866_4 = false,
        id,
        className = "",
        slot_3078_6279,
        slot_3078_6281,
        slot_3078_6282,
        slot_3078_6283,
        slot_3078_6284
    } = props;

    return (
        <div
            className={["component-3078_6277", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6277"
                className="Pixso-symbol-3078_6277 pixso-position-relative"
            >
                <div
                    id="3078_6278"
                    className="Pixso-frame-3078_6278 pixso-flex"
                >
                    <div className="frame-content-3078_6278 pixso-relative-flex">
                        {slot_3078_6279 ??
                            (visible_16866_5 && (
                                <Sizemediumcontenttext
                                    id="3078_6279"
                                    className="Pixso-instance-3078_6279 pixso-relative-no-shrink"
                                ></Sizemediumcontenttext>
                            ))}
                        <div
                            id="3078_6280"
                            className="Pixso-frame-3078_6280 pixso-relative-flex pixso-h-auto"
                        >
                            <div className="frame-content-3078_6280 pixso-relative-flex">
                                {slot_3078_6281 ?? (
                                    <p
                                        id="3078_6281"
                                        className="Pixso-paragraph-3078_6281 pixso-relative-no-shrink pixso-h-auto"
                                    >
                                        {"Title"}
                                    </p>
                                )}
                                {slot_3078_6282 ??
                                    (visible_16866_6 && (
                                        <p
                                            id="3078_6282"
                                            className="Pixso-paragraph-3078_6282 pixso-relative-no-shrink pixso-h-auto"
                                        >
                                            {"Subtitle"}
                                        </p>
                                    ))}
                            </div>
                        </div>
                        {slot_3078_6283 ??
                            (visible_16866_4 && (
                                <NewSwitch
                                    id="3078_6283"
                                    className="Pixso-instance-3078_6283 pixso-relative-no-shrink"
                                ></NewSwitch>
                            ))}
                        {slot_3078_6284 ??
                            (visible_16866_7 && (
                                <NewIconButton
                                    id="3078_6284"
                                    className="Pixso-instance-3078_6284 pixso-relative-no-shrink"
                                ></NewIconButton>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Multiplymultiselectislongtextfalse;
