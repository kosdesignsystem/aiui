import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemegreentypedisablesizebig from "@/components/Darkmodeyesthemegreentypedisablesizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemegreentypedisabledstatedefaultsizebig.css";
interface DarkModeyesthemegreentypedisabledstatedefaultsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26325?: React.ReactNode;
    slot_1_26326?: React.ReactNode;
    slot_1_26327?: React.ReactNode;
    slot_1_26328?: React.ReactNode;
}
const DarkModeyesthemegreentypedisabledstatedefaultsizebig = (
    props: DarkModeyesthemegreentypedisabledstatedefaultsizebigProps
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
        slot_1_26325,
        slot_1_26326,
        slot_1_26327,
        slot_1_26328
    } = props;

    return (
        <div
            className={["component-1_26324", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26324"
                className="Pixso-symbol-1_26324 fill-dark_contentplashka-1_30095 pixso-relative-flex"
            >
                {slot_1_26325 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26325"
                            className="Pixso-instance-1_26325 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26326 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26326"
                            className="Pixso-paragraph-1_26326 fill-dark_contentdisabled-1_30129-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26327 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemegreentypedisablesizebig
                            id="1_26327"
                            className="Pixso-instance-1_26327 pixso-relative-no-shrink"
                        ></Darkmodeyesthemegreentypedisablesizebig>
                    ))}
                {slot_1_26328 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26328"
                            className="Pixso-instance-1_26328 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypedisabledstatedefaultsizebig;
