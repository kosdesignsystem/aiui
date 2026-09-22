import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemebluetypeaccentsizebig from "@/components/Darkmodeyesthemebluetypeaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemebluetypesecondarystatedefaultsizebig.css";
interface DarkModeyesthemebluetypesecondarystatedefaultsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26115?: React.ReactNode;
    slot_1_26116?: React.ReactNode;
    slot_1_26117?: React.ReactNode;
    slot_1_26118?: React.ReactNode;
}
const DarkModeyesthemebluetypesecondarystatedefaultsizebig = (
    props: DarkModeyesthemebluetypesecondarystatedefaultsizebigProps
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
        slot_1_26115,
        slot_1_26116,
        slot_1_26117,
        slot_1_26118
    } = props;

    return (
        <div
            className={["component-1_26114", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26114"
                className="Pixso-symbol-1_26114 fill-dark_contentplashka-1_30095 pixso-relative-flex"
            >
                {slot_1_26115 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26115"
                            className="Pixso-instance-1_26115 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26116 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26116"
                            className="Pixso-paragraph-1_26116 fill-dark_contentprimary-1_10529-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26117 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemebluetypeaccentsizebig
                            id="1_26117"
                            className="Pixso-instance-1_26117 pixso-relative-no-shrink"
                        ></Darkmodeyesthemebluetypeaccentsizebig>
                    ))}
                {slot_1_26118 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26118"
                            className="Pixso-instance-1_26118 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypesecondarystatedefaultsizebig;
