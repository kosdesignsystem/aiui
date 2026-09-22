import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemebluetypeonaccentsizesmall from "@/components/Darkmodeyesthemebluetypeonaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemebluetypeprimarystatepressedsizesmall.css";
interface DarkModeyesthemebluetypeprimarystatepressedsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26395?: React.ReactNode;
    slot_1_26396?: React.ReactNode;
    slot_1_26397?: React.ReactNode;
    slot_1_26398?: React.ReactNode;
}
const DarkModeyesthemebluetypeprimarystatepressedsizesmall = (
    props: DarkModeyesthemebluetypeprimarystatepressedsizesmallProps
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
        slot_1_26395,
        slot_1_26396,
        slot_1_26397,
        slot_1_26398
    } = props;

    return (
        <div
            className={["component-1_26394", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26394"
                className="Pixso-symbol-1_26394 fill-dark-blue_primary-pressed-1_10450 pixso-relative-flex"
            >
                {slot_1_26395 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26395"
                            className="Pixso-instance-1_26395 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26396 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26396"
                            className="Pixso-paragraph-1_26396 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26397 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemebluetypeonaccentsizesmall
                            id="1_26397"
                            className="Pixso-instance-1_26397 pixso-relative-no-shrink"
                        ></Darkmodeyesthemebluetypeonaccentsizesmall>
                    ))}
                {slot_1_26398 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26398"
                            className="Pixso-instance-1_26398 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypeprimarystatepressedsizesmall;
