import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemepurpletypeonaccentsizebig from "@/components/Darkmodeyesthemepurpletypeonaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemepurpletypeprimarystatepressedsizebig.css";
interface DarkModeyesthemepurpletypeprimarystatepressedsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26005?: React.ReactNode;
    slot_1_26006?: React.ReactNode;
    slot_1_26007?: React.ReactNode;
    slot_1_26008?: React.ReactNode;
}
const DarkModeyesthemepurpletypeprimarystatepressedsizebig = (
    props: DarkModeyesthemepurpletypeprimarystatepressedsizebigProps
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
        slot_1_26005,
        slot_1_26006,
        slot_1_26007,
        slot_1_26008
    } = props;

    return (
        <div
            className={["component-1_26004", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26004"
                className="Pixso-symbol-1_26004 fill-dark-purple_primary-pressed-1_10459 pixso-relative-flex"
            >
                {slot_1_26005 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26005"
                            className="Pixso-instance-1_26005 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26006 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26006"
                            className="Pixso-paragraph-1_26006 fill-dark_contentprimary-1_10529-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26007 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemepurpletypeonaccentsizebig
                            id="1_26007"
                            className="Pixso-instance-1_26007 pixso-relative-no-shrink"
                        ></Darkmodeyesthemepurpletypeonaccentsizebig>
                    ))}
                {slot_1_26008 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26008"
                            className="Pixso-instance-1_26008 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypeprimarystatepressedsizebig;
