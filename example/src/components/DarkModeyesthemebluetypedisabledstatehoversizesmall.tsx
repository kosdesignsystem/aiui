import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemebluetypedisablesizesmall from "@/components/Darkmodeyesthemebluetypedisablesizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemebluetypedisabledstatehoversizesmall.css";
interface DarkModeyesthemebluetypedisabledstatehoversizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26750?: React.ReactNode;
    slot_1_26751?: React.ReactNode;
    slot_1_26752?: React.ReactNode;
    slot_1_26753?: React.ReactNode;
}
const DarkModeyesthemebluetypedisabledstatehoversizesmall = (
    props: DarkModeyesthemebluetypedisabledstatehoversizesmallProps
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
        slot_1_26750,
        slot_1_26751,
        slot_1_26752,
        slot_1_26753
    } = props;

    return (
        <div
            className={["component-1_26749", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26749"
                className="Pixso-symbol-1_26749 fill-dark_contentplashka-1_30095 pixso-relative-flex"
            >
                {slot_1_26750 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26750"
                            className="Pixso-instance-1_26750 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26751 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26751"
                            className="Pixso-paragraph-1_26751 fill-dark_contentdisabled-1_30129-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26752 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemebluetypedisablesizesmall
                            id="1_26752"
                            className="Pixso-instance-1_26752 pixso-relative-no-shrink"
                        ></Darkmodeyesthemebluetypedisablesizesmall>
                    ))}
                {slot_1_26753 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26753"
                            className="Pixso-instance-1_26753 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypedisabledstatehoversizesmall;
