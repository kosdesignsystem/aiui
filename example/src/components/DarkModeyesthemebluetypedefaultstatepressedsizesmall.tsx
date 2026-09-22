import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemebluetypedefaultsizesmall from "@/components/Darkmodeyesthemebluetypedefaultsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemebluetypedefaultstatepressedsizesmall.css";
interface DarkModeyesthemebluetypedefaultstatepressedsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26665?: React.ReactNode;
    slot_1_26666?: React.ReactNode;
    slot_1_26667?: React.ReactNode;
    slot_1_26668?: React.ReactNode;
}
const DarkModeyesthemebluetypedefaultstatepressedsizesmall = (
    props: DarkModeyesthemebluetypedefaultstatepressedsizesmallProps
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
        slot_1_26665,
        slot_1_26666,
        slot_1_26667,
        slot_1_26668
    } = props;

    return (
        <div
            className={["component-1_26664", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26664"
                className="Pixso-symbol-1_26664 fill-dark-default_secondary-pressed-1_10485 pixso-relative-flex"
            >
                {slot_1_26665 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26665"
                            className="Pixso-instance-1_26665 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26666 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26666"
                            className="Pixso-paragraph-1_26666 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26667 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemebluetypedefaultsizesmall
                            id="1_26667"
                            className="Pixso-instance-1_26667 pixso-relative-no-shrink"
                        ></Darkmodeyesthemebluetypedefaultsizesmall>
                    ))}
                {slot_1_26668 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26668"
                            className="Pixso-instance-1_26668 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypedefaultstatepressedsizesmall;
