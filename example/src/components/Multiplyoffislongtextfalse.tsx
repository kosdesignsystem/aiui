import Sizemediumcontenttext from "@/components/Sizemediumcontenttext";
import NewSwitch from "@/components/Newswitch";
import NewIconButton from "@/components/Newiconbutton";
import "@/styles/Multiplyoffislongtextfalse.css";
interface MultiplyoffislongtextfalseProps {
    visible_16866_6?: boolean;
    visible_16866_5?: boolean;
    visible_16866_7?: boolean;
    visible_16866_4?: boolean;
    id?: string;
    className?: string;
    slot_3078_6248?: React.ReactNode;
    slot_3078_6250?: React.ReactNode;
    slot_3078_6251?: React.ReactNode;
    slot_3078_6252?: React.ReactNode;
    slot_3078_6253?: React.ReactNode;
}
const Multiplyoffislongtextfalse = (props: MultiplyoffislongtextfalseProps) => {
    const {
        visible_16866_6 = true,
        visible_16866_5 = true,
        visible_16866_7 = false,
        visible_16866_4 = false,
        id,
        className = "",
        slot_3078_6248,
        slot_3078_6250,
        slot_3078_6251,
        slot_3078_6252,
        slot_3078_6253
    } = props;

    return (
        <div
            className={["component-3078_6247", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3078_6247"
                className="Pixso-symbol-3078_6247 pixso-relative-flex"
            >
                {slot_3078_6248 ??
                    (visible_16866_5 && (
                        <Sizemediumcontenttext
                            id="3078_6248"
                            className="Pixso-instance-3078_6248 pixso-relative-no-shrink"
                        ></Sizemediumcontenttext>
                    ))}
                <div
                    id="3078_6249"
                    className="Pixso-frame-3078_6249 pixso-relative-flex pixso-h-auto"
                >
                    <div className="frame-content-3078_6249 pixso-relative-flex">
                        {slot_3078_6250 ?? (
                            <p
                                id="3078_6250"
                                className="Pixso-paragraph-3078_6250 text-regular18-3078_6175 pixso-relative-no-shrink pixso-h-auto"
                            >
                                {"Title"}
                            </p>
                        )}
                        {slot_3078_6251 ??
                            (visible_16866_6 && (
                                <p
                                    id="3078_6251"
                                    className="Pixso-paragraph-3078_6251 text-newr14-3078_6176 pixso-relative-no-shrink pixso-h-auto"
                                >
                                    {"Subtitle"}
                                </p>
                            ))}
                    </div>
                </div>
                {slot_3078_6252 ??
                    (visible_16866_4 && (
                        <NewSwitch
                            id="3078_6252"
                            className="Pixso-instance-3078_6252 pixso-relative-no-shrink"
                        ></NewSwitch>
                    ))}
                {slot_3078_6253 ??
                    (visible_16866_7 && (
                        <NewIconButton
                            id="3078_6253"
                            className="Pixso-instance-3078_6253 pixso-relative-no-shrink"
                        ></NewIconButton>
                    ))}
            </div>
        </div>
    );
};
export default Multiplyoffislongtextfalse;
