import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemebluetypeaccentsizesmall from "@/components/Darkmodeyesthemebluetypeaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemebluetypesecondarystatehoversizesmall.css";
interface DarkModeyesthemebluetypesecondarystatehoversizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26570?: React.ReactNode;
    slot_1_26571?: React.ReactNode;
    slot_1_26572?: React.ReactNode;
    slot_1_26573?: React.ReactNode;
}
const DarkModeyesthemebluetypesecondarystatehoversizesmall = (
    props: DarkModeyesthemebluetypesecondarystatehoversizesmallProps
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
        slot_1_26570,
        slot_1_26571,
        slot_1_26572,
        slot_1_26573
    } = props;

    return (
        <div
            className={["component-1_26569", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26569"
                className="Pixso-symbol-1_26569 fill-dark-default_primary-hover-1_10479 pixso-relative-flex"
            >
                {slot_1_26570 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26570"
                            className="Pixso-instance-1_26570 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26571 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26571"
                            className="Pixso-paragraph-1_26571 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26572 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemebluetypeaccentsizesmall
                            id="1_26572"
                            className="Pixso-instance-1_26572 pixso-relative-no-shrink"
                        ></Darkmodeyesthemebluetypeaccentsizesmall>
                    ))}
                {slot_1_26573 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26573"
                            className="Pixso-instance-1_26573 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypesecondarystatehoversizesmall;
