import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemebluetypeonaccentsizebig from "@/components/Darkmodenothemebluetypeonaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemebluetypeprimarystatedefaultsizebig.css";
interface DarkModenothemebluetypeprimarystatedefaultsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_25920?: React.ReactNode;
    slot_1_25921?: React.ReactNode;
    slot_1_25922?: React.ReactNode;
    slot_1_25923?: React.ReactNode;
}
const DarkModenothemebluetypeprimarystatedefaultsizebig = (
    props: DarkModenothemebluetypeprimarystatedefaultsizebigProps
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
        slot_1_25920,
        slot_1_25921,
        slot_1_25922,
        slot_1_25923
    } = props;

    return (
        <div
            className={["component-1_25919", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_25919"
                className="Pixso-symbol-1_25919 fill-blueprimary-1_10439 pixso-relative-flex"
            >
                {slot_1_25920 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_25920"
                            className="Pixso-instance-1_25920 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_25921 ??
                    (visible_4958_252 && (
                        <p
                            id="1_25921"
                            className="Pixso-paragraph-1_25921 fill-dark_contentprimary-1_10529-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_25922 ??
                    (visible_4958_42 && (
                        <Darkmodenothemebluetypeonaccentsizebig
                            id="1_25922"
                            className="Pixso-instance-1_25922 pixso-relative-no-shrink"
                        ></Darkmodenothemebluetypeonaccentsizebig>
                    ))}
                {slot_1_25923 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_25923"
                            className="Pixso-instance-1_25923 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypeprimarystatedefaultsizebig;
