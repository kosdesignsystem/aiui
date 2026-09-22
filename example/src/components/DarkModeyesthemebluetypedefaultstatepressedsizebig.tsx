import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemebluetypedefaultsizebig from "@/components/Darkmodeyesthemebluetypedefaultsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemebluetypedefaultstatepressedsizebig.css";
interface DarkModeyesthemebluetypedefaultstatepressedsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26215?: React.ReactNode;
    slot_1_26216?: React.ReactNode;
    slot_1_26217?: React.ReactNode;
    slot_1_26218?: React.ReactNode;
}
const DarkModeyesthemebluetypedefaultstatepressedsizebig = (
    props: DarkModeyesthemebluetypedefaultstatepressedsizebigProps
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
        slot_1_26215,
        slot_1_26216,
        slot_1_26217,
        slot_1_26218
    } = props;

    return (
        <div
            className={["component-1_26214", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26214"
                className="Pixso-symbol-1_26214 fill-dark-default_secondary-pressed-1_10485 pixso-relative-flex"
            >
                {slot_1_26215 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26215"
                            className="Pixso-instance-1_26215 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26216 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26216"
                            className="Pixso-paragraph-1_26216 fill-dark_contentprimary-1_10529-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26217 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemebluetypedefaultsizebig
                            id="1_26217"
                            className="Pixso-instance-1_26217 pixso-relative-no-shrink"
                        ></Darkmodeyesthemebluetypedefaultsizebig>
                    ))}
                {slot_1_26218 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26218"
                            className="Pixso-instance-1_26218 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypedefaultstatepressedsizebig;
