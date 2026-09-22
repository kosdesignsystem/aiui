import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemebluetypedisablesizesmall from "@/components/Darkmodenothemebluetypedisablesizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemebluetypedisabledstatehoversizesmall.css";
interface DarkModenothemebluetypedisabledstatehoversizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26735?: React.ReactNode;
    slot_1_26736?: React.ReactNode;
    slot_1_26737?: React.ReactNode;
    slot_1_26738?: React.ReactNode;
}
const DarkModenothemebluetypedisabledstatehoversizesmall = (
    props: DarkModenothemebluetypedisabledstatehoversizesmallProps
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
        slot_1_26735,
        slot_1_26736,
        slot_1_26737,
        slot_1_26738
    } = props;

    return (
        <div
            className={["component-1_26734", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26734"
                className="Pixso-symbol-1_26734 fill-light_contentplashka-1_30125 pixso-relative-flex"
            >
                {slot_1_26735 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26735"
                            className="Pixso-instance-1_26735 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26736 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26736"
                            className="Pixso-paragraph-1_26736 fill-light_contentdisabled-1_30128-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26737 ??
                    (visible_4958_42 && (
                        <Darkmodenothemebluetypedisablesizesmall
                            id="1_26737"
                            className="Pixso-instance-1_26737 pixso-relative-no-shrink"
                        ></Darkmodenothemebluetypedisablesizesmall>
                    ))}
                {slot_1_26738 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26738"
                            className="Pixso-instance-1_26738 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypedisabledstatehoversizesmall;
