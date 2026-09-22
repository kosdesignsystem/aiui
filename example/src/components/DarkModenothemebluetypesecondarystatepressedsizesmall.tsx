import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemebluetypeaccentsizesmall from "@/components/Darkmodenothemebluetypeaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemebluetypesecondarystatepressedsizesmall.css";
interface DarkModenothemebluetypesecondarystatepressedsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26560?: React.ReactNode;
    slot_1_26561?: React.ReactNode;
    slot_1_26562?: React.ReactNode;
    slot_1_26563?: React.ReactNode;
}
const DarkModenothemebluetypesecondarystatepressedsizesmall = (
    props: DarkModenothemebluetypesecondarystatepressedsizesmallProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        instance_4958_126 = "Component_1_26999",
        instance_4958_168 = "Component_1_26822",
        text_4958_210 = "Button",
        visible_4958_252 = true,
        id,
        className = "",
        slot_1_26560,
        slot_1_26561,
        slot_1_26562,
        slot_1_26563
    } = props;

    return (
        <div
            className={["component-1_26559", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26559"
                className="Pixso-symbol-1_26559 fill-light-default_primary-pressed-1_10480 pixso-relative-flex"
            >
                {slot_1_26560 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26560"
                            className="Pixso-instance-1_26560 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26561 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26561"
                            className="Pixso-paragraph-1_26561 fill-light_contentprimary-1_10528-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26562 ??
                    (visible_4958_42 && (
                        <Darkmodenothemebluetypeaccentsizesmall
                            id="1_26562"
                            className="Pixso-instance-1_26562 pixso-relative-no-shrink"
                        ></Darkmodenothemebluetypeaccentsizesmall>
                    ))}
                {slot_1_26563 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26563"
                            className="Pixso-instance-1_26563 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypesecondarystatepressedsizesmall;
