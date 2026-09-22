import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemegreentypeaccentsizebig from "@/components/Darkmodeyesthemegreentypeaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemegreentypesubprimarystatepressedsizebig.css";
interface DarkModeyesthemegreentypesubprimarystatepressedsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26065?: React.ReactNode;
    slot_1_26066?: React.ReactNode;
    slot_1_26067?: React.ReactNode;
    slot_1_26068?: React.ReactNode;
}
const DarkModeyesthemegreentypesubprimarystatepressedsizebig = (
    props: DarkModeyesthemegreentypesubprimarystatepressedsizebigProps
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
        slot_1_26065,
        slot_1_26066,
        slot_1_26067,
        slot_1_26068
    } = props;

    return (
        <div
            className={["component-1_26064", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26064"
                className="Pixso-symbol-1_26064 fill-dark-green_secondary-pressed-1_10469 pixso-relative-flex"
            >
                {slot_1_26065 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26065"
                            className="Pixso-instance-1_26065 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26066 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26066"
                            className="Pixso-paragraph-1_26066 fill-greenprimary-1_30120-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26067 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemegreentypeaccentsizebig
                            id="1_26067"
                            className="Pixso-instance-1_26067 pixso-relative-no-shrink"
                        ></Darkmodeyesthemegreentypeaccentsizebig>
                    ))}
                {slot_1_26068 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26068"
                            className="Pixso-instance-1_26068 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypesubprimarystatepressedsizebig;
