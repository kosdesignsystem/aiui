import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemebluetypedefaultsizesmall from "@/components/Darkmodenothemebluetypedefaultsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemebluetypedefaultstatedefaultsizesmall.css";
interface DarkModenothemebluetypedefaultstatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26640?: React.ReactNode;
    slot_1_26641?: React.ReactNode;
    slot_1_26642?: React.ReactNode;
    slot_1_26643?: React.ReactNode;
}
const DarkModenothemebluetypedefaultstatedefaultsizesmall = (
    props: DarkModenothemebluetypedefaultstatedefaultsizesmallProps
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
        slot_1_26640,
        slot_1_26641,
        slot_1_26642,
        slot_1_26643
    } = props;

    return (
        <div
            className={["component-1_26639", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26639"
                className="Pixso-symbol-1_26639 pixso-relative-flex"
            >
                {slot_1_26640 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26640"
                            className="Pixso-instance-1_26640 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26641 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26641"
                            className="Pixso-paragraph-1_26641 fill-light_contentprimary-1_10528-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26642 ??
                    (visible_4958_42 && (
                        <Darkmodenothemebluetypedefaultsizesmall
                            id="1_26642"
                            className="Pixso-instance-1_26642 pixso-relative-no-shrink"
                        ></Darkmodenothemebluetypedefaultsizesmall>
                    ))}
                {slot_1_26643 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26643"
                            className="Pixso-instance-1_26643 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypedefaultstatedefaultsizesmall;
