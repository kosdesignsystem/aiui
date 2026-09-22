import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemepurpletypedefaultsizesmall from "@/components/Darkmodeyesthemepurpletypedefaultsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemepurpletypedefaultstatedefaultsizesmall.css";
interface DarkModeyesthemepurpletypedefaultstatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26715?: React.ReactNode;
    slot_1_26716?: React.ReactNode;
    slot_1_26717?: React.ReactNode;
    slot_1_26718?: React.ReactNode;
}
const DarkModeyesthemepurpletypedefaultstatedefaultsizesmall = (
    props: DarkModeyesthemepurpletypedefaultstatedefaultsizesmallProps
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
        slot_1_26715,
        slot_1_26716,
        slot_1_26717,
        slot_1_26718
    } = props;

    return (
        <div
            className={["component-1_26714", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26714"
                className="Pixso-symbol-1_26714 pixso-relative-flex"
            >
                {slot_1_26715 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26715"
                            className="Pixso-instance-1_26715 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26716 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26716"
                            className="Pixso-paragraph-1_26716 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26717 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemepurpletypedefaultsizesmall
                            id="1_26717"
                            className="Pixso-instance-1_26717 pixso-relative-no-shrink"
                        ></Darkmodeyesthemepurpletypedefaultsizesmall>
                    ))}
                {slot_1_26718 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26718"
                            className="Pixso-instance-1_26718 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypedefaultstatedefaultsizesmall;
