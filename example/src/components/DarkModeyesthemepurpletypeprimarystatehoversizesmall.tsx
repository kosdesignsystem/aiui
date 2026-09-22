import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemepurpletypeonaccentsizesmall from "@/components/Darkmodeyesthemepurpletypeonaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemepurpletypeprimarystatehoversizesmall.css";
interface DarkModeyesthemepurpletypeprimarystatehoversizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26450?: React.ReactNode;
    slot_1_26451?: React.ReactNode;
    slot_1_26452?: React.ReactNode;
    slot_1_26453?: React.ReactNode;
}
const DarkModeyesthemepurpletypeprimarystatehoversizesmall = (
    props: DarkModeyesthemepurpletypeprimarystatehoversizesmallProps
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
        slot_1_26450,
        slot_1_26451,
        slot_1_26452,
        slot_1_26453
    } = props;

    return (
        <div
            className={["component-1_26449", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26449"
                className="Pixso-symbol-1_26449 fill-dark-purple_primary-hover-1_10457 pixso-relative-flex"
            >
                {slot_1_26450 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26450"
                            className="Pixso-instance-1_26450 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26451 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26451"
                            className="Pixso-paragraph-1_26451 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26452 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemepurpletypeonaccentsizesmall
                            id="1_26452"
                            className="Pixso-instance-1_26452 pixso-relative-no-shrink"
                        ></Darkmodeyesthemepurpletypeonaccentsizesmall>
                    ))}
                {slot_1_26453 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26453"
                            className="Pixso-instance-1_26453 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypeprimarystatehoversizesmall;
