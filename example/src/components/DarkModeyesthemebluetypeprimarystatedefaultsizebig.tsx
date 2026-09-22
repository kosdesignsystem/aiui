import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemebluetypeonaccentsizebig from "@/components/Darkmodeyesthemebluetypeonaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemebluetypeprimarystatedefaultsizebig.css";
interface DarkModeyesthemebluetypeprimarystatedefaultsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_25935?: React.ReactNode;
    slot_1_25936?: React.ReactNode;
    slot_1_25937?: React.ReactNode;
    slot_1_25938?: React.ReactNode;
}
const DarkModeyesthemebluetypeprimarystatedefaultsizebig = (
    props: DarkModeyesthemebluetypeprimarystatedefaultsizebigProps
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
        slot_1_25935,
        slot_1_25936,
        slot_1_25937,
        slot_1_25938
    } = props;

    return (
        <div
            className={["component-1_25934", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_25934"
                className="Pixso-symbol-1_25934 fill-blueprimary-1_10439 pixso-relative-flex"
            >
                {slot_1_25935 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_25935"
                            className="Pixso-instance-1_25935 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_25936 ??
                    (visible_4958_252 && (
                        <p
                            id="1_25936"
                            className="Pixso-paragraph-1_25936 fill-dark_contentprimary-1_10529-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_25937 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemebluetypeonaccentsizebig
                            id="1_25937"
                            className="Pixso-instance-1_25937 pixso-relative-no-shrink"
                        ></Darkmodeyesthemebluetypeonaccentsizebig>
                    ))}
                {slot_1_25938 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_25938"
                            className="Pixso-instance-1_25938 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypeprimarystatedefaultsizebig;
