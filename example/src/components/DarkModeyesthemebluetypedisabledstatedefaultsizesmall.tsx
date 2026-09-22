import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemebluetypedisablesizesmall from "@/components/Darkmodeyesthemebluetypedisablesizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemebluetypedisabledstatedefaultsizesmall.css";
interface DarkModeyesthemebluetypedisabledstatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26745?: React.ReactNode;
    slot_1_26746?: React.ReactNode;
    slot_1_26747?: React.ReactNode;
    slot_1_26748?: React.ReactNode;
}
const DarkModeyesthemebluetypedisabledstatedefaultsizesmall = (
    props: DarkModeyesthemebluetypedisabledstatedefaultsizesmallProps
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
        slot_1_26745,
        slot_1_26746,
        slot_1_26747,
        slot_1_26748
    } = props;

    return (
        <div
            className={["component-1_26744", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26744"
                className="Pixso-symbol-1_26744 fill-dark_contentplashka-1_30095 pixso-relative-flex"
            >
                {slot_1_26745 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26745"
                            className="Pixso-instance-1_26745 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26746 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26746"
                            className="Pixso-paragraph-1_26746 fill-dark_contentdisabled-1_30129-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26747 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemebluetypedisablesizesmall
                            id="1_26747"
                            className="Pixso-instance-1_26747 pixso-relative-no-shrink"
                        ></Darkmodeyesthemebluetypedisablesizesmall>
                    ))}
                {slot_1_26748 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26748"
                            className="Pixso-instance-1_26748 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypedisabledstatedefaultsizesmall;
