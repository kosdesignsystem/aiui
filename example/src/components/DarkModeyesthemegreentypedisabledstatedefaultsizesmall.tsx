import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemegreentypedisablesizesmall from "@/components/Darkmodeyesthemegreentypedisablesizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemegreentypedisabledstatedefaultsizesmall.css";
interface DarkModeyesthemegreentypedisabledstatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26775?: React.ReactNode;
    slot_1_26776?: React.ReactNode;
    slot_1_26777?: React.ReactNode;
    slot_1_26778?: React.ReactNode;
}
const DarkModeyesthemegreentypedisabledstatedefaultsizesmall = (
    props: DarkModeyesthemegreentypedisabledstatedefaultsizesmallProps
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
        slot_1_26775,
        slot_1_26776,
        slot_1_26777,
        slot_1_26778
    } = props;

    return (
        <div
            className={["component-1_26774", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26774"
                className="Pixso-symbol-1_26774 fill-dark_contentplashka-1_30095 pixso-relative-flex"
            >
                {slot_1_26775 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26775"
                            className="Pixso-instance-1_26775 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26776 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26776"
                            className="Pixso-paragraph-1_26776 fill-dark_contentdisabled-1_30129-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26777 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemegreentypedisablesizesmall
                            id="1_26777"
                            className="Pixso-instance-1_26777 pixso-relative-no-shrink"
                        ></Darkmodeyesthemegreentypedisablesizesmall>
                    ))}
                {slot_1_26778 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26778"
                            className="Pixso-instance-1_26778 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypedisabledstatedefaultsizesmall;
