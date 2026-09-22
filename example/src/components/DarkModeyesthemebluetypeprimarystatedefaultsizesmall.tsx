import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemebluetypeonaccentsizesmall from "@/components/Darkmodeyesthemebluetypeonaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemebluetypeprimarystatedefaultsizesmall.css";
interface DarkModeyesthemebluetypeprimarystatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26385?: React.ReactNode;
    slot_1_26386?: React.ReactNode;
    slot_1_26387?: React.ReactNode;
    slot_1_26388?: React.ReactNode;
}
const DarkModeyesthemebluetypeprimarystatedefaultsizesmall = (
    props: DarkModeyesthemebluetypeprimarystatedefaultsizesmallProps
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
        slot_1_26385,
        slot_1_26386,
        slot_1_26387,
        slot_1_26388
    } = props;

    return (
        <div
            className={["component-1_26384", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26384"
                className="Pixso-symbol-1_26384 fill-blueprimary-1_10439 pixso-relative-flex"
            >
                {slot_1_26385 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26385"
                            className="Pixso-instance-1_26385 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26386 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26386"
                            className="Pixso-paragraph-1_26386 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26387 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemebluetypeonaccentsizesmall
                            id="1_26387"
                            className="Pixso-instance-1_26387 pixso-relative-no-shrink"
                        ></Darkmodeyesthemebluetypeonaccentsizesmall>
                    ))}
                {slot_1_26388 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26388"
                            className="Pixso-instance-1_26388 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypeprimarystatedefaultsizesmall;
