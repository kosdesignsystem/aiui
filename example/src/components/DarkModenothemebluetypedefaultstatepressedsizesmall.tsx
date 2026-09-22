import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemebluetypedefaultsizesmall from "@/components/Darkmodenothemebluetypedefaultsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemebluetypedefaultstatepressedsizesmall.css";
interface DarkModenothemebluetypedefaultstatepressedsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26650?: React.ReactNode;
    slot_1_26651?: React.ReactNode;
    slot_1_26652?: React.ReactNode;
    slot_1_26653?: React.ReactNode;
}
const DarkModenothemebluetypedefaultstatepressedsizesmall = (
    props: DarkModenothemebluetypedefaultstatepressedsizesmallProps
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
        slot_1_26650,
        slot_1_26651,
        slot_1_26652,
        slot_1_26653
    } = props;

    return (
        <div
            className={["component-1_26649", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26649"
                className="Pixso-symbol-1_26649 fill-light-default_secondary-pressed-1_10484 pixso-relative-flex"
            >
                {slot_1_26650 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26650"
                            className="Pixso-instance-1_26650 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26651 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26651"
                            className="Pixso-paragraph-1_26651 fill-light_contentprimary-1_10528-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26652 ??
                    (visible_4958_42 && (
                        <Darkmodenothemebluetypedefaultsizesmall
                            id="1_26652"
                            className="Pixso-instance-1_26652 pixso-relative-no-shrink"
                        ></Darkmodenothemebluetypedefaultsizesmall>
                    ))}
                {slot_1_26653 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26653"
                            className="Pixso-instance-1_26653 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypedefaultstatepressedsizesmall;
