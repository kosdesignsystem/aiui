import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemebluetypeaccentsizesmall from "@/components/Darkmodenothemebluetypeaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemebluetypesecondarystatedefaultsizesmall.css";
interface DarkModenothemebluetypesecondarystatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26550?: React.ReactNode;
    slot_1_26551?: React.ReactNode;
    slot_1_26552?: React.ReactNode;
    slot_1_26553?: React.ReactNode;
}
const DarkModenothemebluetypesecondarystatedefaultsizesmall = (
    props: DarkModenothemebluetypesecondarystatedefaultsizesmallProps
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
        slot_1_26550,
        slot_1_26551,
        slot_1_26552,
        slot_1_26553
    } = props;

    return (
        <div
            className={["component-1_26549", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26549"
                className="Pixso-symbol-1_26549 fill-light_contentplashka-1_30125 pixso-relative-flex"
            >
                {slot_1_26550 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26550"
                            className="Pixso-instance-1_26550 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26551 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26551"
                            className="Pixso-paragraph-1_26551 fill-light_contentprimary-1_10528-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26552 ??
                    (visible_4958_42 && (
                        <Darkmodenothemebluetypeaccentsizesmall
                            id="1_26552"
                            className="Pixso-instance-1_26552 pixso-relative-no-shrink"
                        ></Darkmodenothemebluetypeaccentsizesmall>
                    ))}
                {slot_1_26553 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26553"
                            className="Pixso-instance-1_26553 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypesecondarystatedefaultsizesmall;
