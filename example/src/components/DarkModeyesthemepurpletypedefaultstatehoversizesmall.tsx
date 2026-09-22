import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemepurpletypedefaultsizesmall from "@/components/Darkmodeyesthemepurpletypedefaultsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemepurpletypedefaultstatehoversizesmall.css";
interface DarkModeyesthemepurpletypedefaultstatehoversizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26720?: React.ReactNode;
    slot_1_26721?: React.ReactNode;
    slot_1_26722?: React.ReactNode;
    slot_1_26723?: React.ReactNode;
}
const DarkModeyesthemepurpletypedefaultstatehoversizesmall = (
    props: DarkModeyesthemepurpletypedefaultstatehoversizesmallProps
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
        slot_1_26720,
        slot_1_26721,
        slot_1_26722,
        slot_1_26723
    } = props;

    return (
        <div
            className={["component-1_26719", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26719"
                className="Pixso-symbol-1_26719 fill-dark-default_secondary-hover-1_10483 pixso-relative-flex"
            >
                {slot_1_26720 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26720"
                            className="Pixso-instance-1_26720 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26721 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26721"
                            className="Pixso-paragraph-1_26721 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26722 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemepurpletypedefaultsizesmall
                            id="1_26722"
                            className="Pixso-instance-1_26722 pixso-relative-no-shrink"
                        ></Darkmodeyesthemepurpletypedefaultsizesmall>
                    ))}
                {slot_1_26723 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26723"
                            className="Pixso-instance-1_26723 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypedefaultstatehoversizesmall;
