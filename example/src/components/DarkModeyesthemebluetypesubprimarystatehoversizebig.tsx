import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemebluetypeaccentsizebig from "@/components/Darkmodeyesthemebluetypeaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemebluetypesubprimarystatehoversizebig.css";
interface DarkModeyesthemebluetypesubprimarystatehoversizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26030?: React.ReactNode;
    slot_1_26031?: React.ReactNode;
    slot_1_26032?: React.ReactNode;
    slot_1_26033?: React.ReactNode;
}
const DarkModeyesthemebluetypesubprimarystatehoversizebig = (
    props: DarkModeyesthemebluetypesubprimarystatehoversizebigProps
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
        slot_1_26030,
        slot_1_26031,
        slot_1_26032,
        slot_1_26033
    } = props;

    return (
        <div
            className={["component-1_26029", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26029"
                className="Pixso-symbol-1_26029 fill-dark-blue_secondary-hover-1_10462 pixso-relative-flex"
            >
                {slot_1_26030 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26030"
                            className="Pixso-instance-1_26030 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26031 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26031"
                            className="Pixso-paragraph-1_26031 fill-blueprimary-1_10439-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26032 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemebluetypeaccentsizebig
                            id="1_26032"
                            className="Pixso-instance-1_26032 pixso-relative-no-shrink"
                        ></Darkmodeyesthemebluetypeaccentsizebig>
                    ))}
                {slot_1_26033 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26033"
                            className="Pixso-instance-1_26033 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypesubprimarystatehoversizebig;
