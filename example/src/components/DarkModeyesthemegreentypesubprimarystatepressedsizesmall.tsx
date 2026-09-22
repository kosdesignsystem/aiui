import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemegreentypeaccentsizesmall from "@/components/Darkmodeyesthemegreentypeaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemegreentypesubprimarystatepressedsizesmall.css";
interface DarkModeyesthemegreentypesubprimarystatepressedsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26515?: React.ReactNode;
    slot_1_26516?: React.ReactNode;
    slot_1_26517?: React.ReactNode;
    slot_1_26518?: React.ReactNode;
}
const DarkModeyesthemegreentypesubprimarystatepressedsizesmall = (
    props: DarkModeyesthemegreentypesubprimarystatepressedsizesmallProps
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
        slot_1_26515,
        slot_1_26516,
        slot_1_26517,
        slot_1_26518
    } = props;

    return (
        <div
            className={["component-1_26514", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26514"
                className="Pixso-symbol-1_26514 fill-dark-green_secondary-pressed-1_10469 pixso-relative-flex"
            >
                {slot_1_26515 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26515"
                            className="Pixso-instance-1_26515 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26516 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26516"
                            className="Pixso-paragraph-1_26516 fill-greenprimary-1_30120-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26517 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemegreentypeaccentsizesmall
                            id="1_26517"
                            className="Pixso-instance-1_26517 pixso-relative-no-shrink"
                        ></Darkmodeyesthemegreentypeaccentsizesmall>
                    ))}
                {slot_1_26518 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26518"
                            className="Pixso-instance-1_26518 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypesubprimarystatepressedsizesmall;
