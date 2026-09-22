import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemegreentypedisablesizesmall from "@/components/Darkmodeyesthemegreentypedisablesizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemegreentypedisabledstatehoversizesmall.css";
interface DarkModeyesthemegreentypedisabledstatehoversizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26780?: React.ReactNode;
    slot_1_26781?: React.ReactNode;
    slot_1_26782?: React.ReactNode;
    slot_1_26783?: React.ReactNode;
}
const DarkModeyesthemegreentypedisabledstatehoversizesmall = (
    props: DarkModeyesthemegreentypedisabledstatehoversizesmallProps
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
        slot_1_26780,
        slot_1_26781,
        slot_1_26782,
        slot_1_26783
    } = props;

    return (
        <div
            className={["component-1_26779", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26779"
                className="Pixso-symbol-1_26779 fill-dark_contentplashka-1_30095 pixso-relative-flex"
            >
                {slot_1_26780 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26780"
                            className="Pixso-instance-1_26780 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26781 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26781"
                            className="Pixso-paragraph-1_26781 fill-dark_contentdisabled-1_30129-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26782 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemegreentypedisablesizesmall
                            id="1_26782"
                            className="Pixso-instance-1_26782 pixso-relative-no-shrink"
                        ></Darkmodeyesthemegreentypedisablesizesmall>
                    ))}
                {slot_1_26783 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26783"
                            className="Pixso-instance-1_26783 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypedisabledstatehoversizesmall;
