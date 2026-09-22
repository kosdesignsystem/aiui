import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemebluetypedefaultsizesmall from "@/components/Darkmodeyesthemebluetypedefaultsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemebluetypedefaultstatedefaultsizesmall.css";
interface DarkModeyesthemebluetypedefaultstatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26655?: React.ReactNode;
    slot_1_26656?: React.ReactNode;
    slot_1_26657?: React.ReactNode;
    slot_1_26658?: React.ReactNode;
}
const DarkModeyesthemebluetypedefaultstatedefaultsizesmall = (
    props: DarkModeyesthemebluetypedefaultstatedefaultsizesmallProps
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
        slot_1_26655,
        slot_1_26656,
        slot_1_26657,
        slot_1_26658
    } = props;

    return (
        <div
            className={["component-1_26654", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26654"
                className="Pixso-symbol-1_26654 pixso-relative-flex"
            >
                {slot_1_26655 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26655"
                            className="Pixso-instance-1_26655 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26656 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26656"
                            className="Pixso-paragraph-1_26656 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26657 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemebluetypedefaultsizesmall
                            id="1_26657"
                            className="Pixso-instance-1_26657 pixso-relative-no-shrink"
                        ></Darkmodeyesthemebluetypedefaultsizesmall>
                    ))}
                {slot_1_26658 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26658"
                            className="Pixso-instance-1_26658 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypedefaultstatedefaultsizesmall;
