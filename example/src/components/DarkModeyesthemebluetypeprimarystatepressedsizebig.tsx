import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemebluetypeonaccentsizebig from "@/components/Darkmodeyesthemebluetypeonaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemebluetypeprimarystatepressedsizebig.css";
interface DarkModeyesthemebluetypeprimarystatepressedsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_25945?: React.ReactNode;
    slot_1_25946?: React.ReactNode;
    slot_1_25947?: React.ReactNode;
    slot_1_25948?: React.ReactNode;
}
const DarkModeyesthemebluetypeprimarystatepressedsizebig = (
    props: DarkModeyesthemebluetypeprimarystatepressedsizebigProps
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
        slot_1_25945,
        slot_1_25946,
        slot_1_25947,
        slot_1_25948
    } = props;

    return (
        <div
            className={["component-1_25944", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_25944"
                className="Pixso-symbol-1_25944 fill-dark-blue_primary-pressed-1_10450 pixso-relative-flex"
            >
                {slot_1_25945 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_25945"
                            className="Pixso-instance-1_25945 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_25946 ??
                    (visible_4958_252 && (
                        <p
                            id="1_25946"
                            className="Pixso-paragraph-1_25946 fill-dark_contentprimary-1_10529-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_25947 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemebluetypeonaccentsizebig
                            id="1_25947"
                            className="Pixso-instance-1_25947 pixso-relative-no-shrink"
                        ></Darkmodeyesthemebluetypeonaccentsizebig>
                    ))}
                {slot_1_25948 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_25948"
                            className="Pixso-instance-1_25948 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypeprimarystatepressedsizebig;
