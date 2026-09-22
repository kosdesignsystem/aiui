import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemegreentypeonaccentsizebig from "@/components/Darkmodeyesthemegreentypeonaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemegreentypeprimarystatehoversizebig.css";
interface DarkModeyesthemegreentypeprimarystatehoversizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_25970?: React.ReactNode;
    slot_1_25971?: React.ReactNode;
    slot_1_25972?: React.ReactNode;
    slot_1_25973?: React.ReactNode;
}
const DarkModeyesthemegreentypeprimarystatehoversizebig = (
    props: DarkModeyesthemegreentypeprimarystatehoversizebigProps
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
        slot_1_25970,
        slot_1_25971,
        slot_1_25972,
        slot_1_25973
    } = props;

    return (
        <div
            className={["component-1_25969", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_25969"
                className="Pixso-symbol-1_25969 fill-dark-green_primary-hover-1_10453 pixso-relative-flex"
            >
                {slot_1_25970 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_25970"
                            className="Pixso-instance-1_25970 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_25971 ??
                    (visible_4958_252 && (
                        <p
                            id="1_25971"
                            className="Pixso-paragraph-1_25971 fill-dark_contentprimary-1_10529-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_25972 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemegreentypeonaccentsizebig
                            id="1_25972"
                            className="Pixso-instance-1_25972 pixso-relative-no-shrink"
                        ></Darkmodeyesthemegreentypeonaccentsizebig>
                    ))}
                {slot_1_25973 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_25973"
                            className="Pixso-instance-1_25973 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypeprimarystatehoversizebig;
