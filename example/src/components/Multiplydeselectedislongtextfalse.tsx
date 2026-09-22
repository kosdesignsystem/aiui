import Sizemediumcontenttext from "@/components/Sizemediumcontenttext";
import NewSwitch from "@/components/Newswitch";
import NewIconButton from "@/components/Newiconbutton";
import "@/styles/Multiplydeselectedislongtextfalse.css";
interface MultiplydeselectedislongtextfalseProps {
    visible_16866_6?: boolean;
    visible_16866_5?: boolean;
    visible_16866_7?: boolean;
    visible_16866_4?: boolean;
    id?: string;
    className?: string;
    slot_3078_6255?: React.ReactNode;
    slot_3078_6257?: React.ReactNode;
    slot_3078_6258?: React.ReactNode;
    slot_3078_6259?: React.ReactNode;
    slot_3078_6260?: React.ReactNode;
}
const Multiplydeselectedislongtextfalse = (
    props: MultiplydeselectedislongtextfalseProps
) => {
    const {
        visible_16866_6 = true,
        visible_16866_5 = true,
        visible_16866_7 = false,
        visible_16866_4 = false,
        id,
        className = "",
        slot_3078_6255,
        slot_3078_6257,
        slot_3078_6258,
        slot_3078_6259,
        slot_3078_6260
    } = props;

    return (
        <div
            className={["component-3078_6254", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6254"
                className="Pixso-symbol-3078_6254 pixso-relative-flex"
            >
                {slot_3078_6255 ??
                    (visible_16866_5 && (
                        <Sizemediumcontenttext
                            id="3078_6255"
                            className="Pixso-instance-3078_6255 pixso-relative-no-shrink"
                        ></Sizemediumcontenttext>
                    ))}
                <div
                    id="3078_6256"
                    className="Pixso-frame-3078_6256 pixso-relative-flex pixso-h-auto"
                >
                    <div className="frame-content-3078_6256 pixso-relative-flex">
                        {slot_3078_6257 ?? (
                            <p
                                id="3078_6257"
                                className="Pixso-paragraph-3078_6257 pixso-relative-no-shrink pixso-h-auto"
                            >
                                {"Title"}
                            </p>
                        )}
                        {slot_3078_6258 ??
                            (visible_16866_6 && (
                                <p
                                    id="3078_6258"
                                    className="Pixso-paragraph-3078_6258 pixso-relative-no-shrink pixso-h-auto"
                                >
                                    {"Subtitle"}
                                </p>
                            ))}
                    </div>
                </div>
                {slot_3078_6259 ??
                    (visible_16866_4 && (
                        <NewSwitch
                            id="3078_6259"
                            className="Pixso-instance-3078_6259 pixso-relative-no-shrink"
                        ></NewSwitch>
                    ))}
                {slot_3078_6260 ??
                    (visible_16866_7 && (
                        <NewIconButton
                            id="3078_6260"
                            className="Pixso-instance-3078_6260 pixso-relative-no-shrink"
                        ></NewIconButton>
                    ))}
            </div>
        </div>
    );
};
export default Multiplydeselectedislongtextfalse;
