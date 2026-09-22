import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemebluetypedisablesizesmall from "@/components/Darkmodenothemebluetypedisablesizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemebluetypedisabledstatepressedsizesmall.css";
interface DarkModenothemebluetypedisabledstatepressedsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26740?: React.ReactNode;
    slot_1_26741?: React.ReactNode;
    slot_1_26742?: React.ReactNode;
    slot_1_26743?: React.ReactNode;
}
const DarkModenothemebluetypedisabledstatepressedsizesmall = (
    props: DarkModenothemebluetypedisabledstatepressedsizesmallProps
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
        slot_1_26740,
        slot_1_26741,
        slot_1_26742,
        slot_1_26743
    } = props;

    return (
        <div
            className={["component-1_26739", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26739"
                className="Pixso-symbol-1_26739 fill-light_contentplashka-1_30125 pixso-relative-flex"
            >
                {slot_1_26740 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26740"
                            className="Pixso-instance-1_26740 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26741 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26741"
                            className="Pixso-paragraph-1_26741 fill-light_contentdisabled-1_30128-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26742 ??
                    (visible_4958_42 && (
                        <Darkmodenothemebluetypedisablesizesmall
                            id="1_26742"
                            className="Pixso-instance-1_26742 pixso-relative-no-shrink"
                        ></Darkmodenothemebluetypedisablesizesmall>
                    ))}
                {slot_1_26743 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26743"
                            className="Pixso-instance-1_26743 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypedisabledstatepressedsizesmall;
