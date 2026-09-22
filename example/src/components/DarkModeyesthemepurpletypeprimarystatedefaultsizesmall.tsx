import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemepurpletypeonaccentsizesmall from "@/components/Darkmodeyesthemepurpletypeonaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemepurpletypeprimarystatedefaultsizesmall.css";
interface DarkModeyesthemepurpletypeprimarystatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26445?: React.ReactNode;
    slot_1_26446?: React.ReactNode;
    slot_1_26447?: React.ReactNode;
    slot_1_26448?: React.ReactNode;
}
const DarkModeyesthemepurpletypeprimarystatedefaultsizesmall = (
    props: DarkModeyesthemepurpletypeprimarystatedefaultsizesmallProps
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
        slot_1_26445,
        slot_1_26446,
        slot_1_26447,
        slot_1_26448
    } = props;

    return (
        <div
            className={["component-1_26444", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26444"
                className="Pixso-symbol-1_26444 fill-purpleprimary-1_30121 pixso-relative-flex"
            >
                {slot_1_26445 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26445"
                            className="Pixso-instance-1_26445 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26446 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26446"
                            className="Pixso-paragraph-1_26446 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26447 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemepurpletypeonaccentsizesmall
                            id="1_26447"
                            className="Pixso-instance-1_26447 pixso-relative-no-shrink"
                        ></Darkmodeyesthemepurpletypeonaccentsizesmall>
                    ))}
                {slot_1_26448 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26448"
                            className="Pixso-instance-1_26448 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypeprimarystatedefaultsizesmall;
