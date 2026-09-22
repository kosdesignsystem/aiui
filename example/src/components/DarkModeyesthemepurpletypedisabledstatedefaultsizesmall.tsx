import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemepurpletypedisablesizesmall from "@/components/Darkmodeyesthemepurpletypedisablesizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemepurpletypedisabledstatedefaultsizesmall.css";
interface DarkModeyesthemepurpletypedisabledstatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26805?: React.ReactNode;
    slot_1_26806?: React.ReactNode;
    slot_1_26807?: React.ReactNode;
    slot_1_26808?: React.ReactNode;
}
const DarkModeyesthemepurpletypedisabledstatedefaultsizesmall = (
    props: DarkModeyesthemepurpletypedisabledstatedefaultsizesmallProps
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
        slot_1_26805,
        slot_1_26806,
        slot_1_26807,
        slot_1_26808
    } = props;

    return (
        <div
            className={["component-1_26804", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26804"
                className="Pixso-symbol-1_26804 fill-dark_contentplashka-1_30095 pixso-relative-flex"
            >
                {slot_1_26805 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26805"
                            className="Pixso-instance-1_26805 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26806 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26806"
                            className="Pixso-paragraph-1_26806 fill-dark_contentdisabled-1_30129-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26807 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemepurpletypedisablesizesmall
                            id="1_26807"
                            className="Pixso-instance-1_26807 pixso-relative-no-shrink"
                        ></Darkmodeyesthemepurpletypedisablesizesmall>
                    ))}
                {slot_1_26808 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26808"
                            className="Pixso-instance-1_26808 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypedisabledstatedefaultsizesmall;
