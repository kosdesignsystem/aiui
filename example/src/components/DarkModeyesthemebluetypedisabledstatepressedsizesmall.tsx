import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemebluetypedisablesizesmall from "@/components/Darkmodeyesthemebluetypedisablesizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemebluetypedisabledstatepressedsizesmall.css";
interface DarkModeyesthemebluetypedisabledstatepressedsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26755?: React.ReactNode;
    slot_1_26756?: React.ReactNode;
    slot_1_26757?: React.ReactNode;
    slot_1_26758?: React.ReactNode;
}
const DarkModeyesthemebluetypedisabledstatepressedsizesmall = (
    props: DarkModeyesthemebluetypedisabledstatepressedsizesmallProps
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
        slot_1_26755,
        slot_1_26756,
        slot_1_26757,
        slot_1_26758
    } = props;

    return (
        <div
            className={["component-1_26754", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26754"
                className="Pixso-symbol-1_26754 fill-dark_contentplashka-1_30095 pixso-relative-flex"
            >
                {slot_1_26755 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26755"
                            className="Pixso-instance-1_26755 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26756 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26756"
                            className="Pixso-paragraph-1_26756 fill-dark_contentdisabled-1_30129-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26757 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemebluetypedisablesizesmall
                            id="1_26757"
                            className="Pixso-instance-1_26757 pixso-relative-no-shrink"
                        ></Darkmodeyesthemebluetypedisablesizesmall>
                    ))}
                {slot_1_26758 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26758"
                            className="Pixso-instance-1_26758 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypedisabledstatepressedsizesmall;
