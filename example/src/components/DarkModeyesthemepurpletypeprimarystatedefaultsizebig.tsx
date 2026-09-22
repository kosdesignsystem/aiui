import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemepurpletypeonaccentsizebig from "@/components/Darkmodeyesthemepurpletypeonaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemepurpletypeprimarystatedefaultsizebig.css";
interface DarkModeyesthemepurpletypeprimarystatedefaultsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_25995?: React.ReactNode;
    slot_1_25996?: React.ReactNode;
    slot_1_25997?: React.ReactNode;
    slot_1_25998?: React.ReactNode;
}
const DarkModeyesthemepurpletypeprimarystatedefaultsizebig = (
    props: DarkModeyesthemepurpletypeprimarystatedefaultsizebigProps
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
        slot_1_25995,
        slot_1_25996,
        slot_1_25997,
        slot_1_25998
    } = props;

    return (
        <div
            className={["component-1_25994", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_25994"
                className="Pixso-symbol-1_25994 fill-purpleprimary-1_30121 pixso-relative-flex"
            >
                {slot_1_25995 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_25995"
                            className="Pixso-instance-1_25995 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_25996 ??
                    (visible_4958_252 && (
                        <p
                            id="1_25996"
                            className="Pixso-paragraph-1_25996 fill-dark_contentprimary-1_10529-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_25997 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemepurpletypeonaccentsizebig
                            id="1_25997"
                            className="Pixso-instance-1_25997 pixso-relative-no-shrink"
                        ></Darkmodeyesthemepurpletypeonaccentsizebig>
                    ))}
                {slot_1_25998 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_25998"
                            className="Pixso-instance-1_25998 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypeprimarystatedefaultsizebig;
