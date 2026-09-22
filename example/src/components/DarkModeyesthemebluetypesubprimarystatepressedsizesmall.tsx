import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemebluetypeaccentsizesmall from "@/components/Darkmodeyesthemebluetypeaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemebluetypesubprimarystatepressedsizesmall.css";
interface DarkModeyesthemebluetypesubprimarystatepressedsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26485?: React.ReactNode;
    slot_1_26486?: React.ReactNode;
    slot_1_26487?: React.ReactNode;
    slot_1_26488?: React.ReactNode;
}
const DarkModeyesthemebluetypesubprimarystatepressedsizesmall = (
    props: DarkModeyesthemebluetypesubprimarystatepressedsizesmallProps
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
        slot_1_26485,
        slot_1_26486,
        slot_1_26487,
        slot_1_26488
    } = props;

    return (
        <div
            className={["component-1_26484", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26484"
                className="Pixso-symbol-1_26484 fill-dark-blue_secondary-pressed-1_10464 pixso-relative-flex"
            >
                {slot_1_26485 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26485"
                            className="Pixso-instance-1_26485 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26486 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26486"
                            className="Pixso-paragraph-1_26486 fill-blueprimary-1_10439-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26487 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemebluetypeaccentsizesmall
                            id="1_26487"
                            className="Pixso-instance-1_26487 pixso-relative-no-shrink"
                        ></Darkmodeyesthemebluetypeaccentsizesmall>
                    ))}
                {slot_1_26488 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26488"
                            className="Pixso-instance-1_26488 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypesubprimarystatepressedsizesmall;
