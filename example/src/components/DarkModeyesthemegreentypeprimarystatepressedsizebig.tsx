import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemegreentypeonaccentsizebig from "@/components/Darkmodeyesthemegreentypeonaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemegreentypeprimarystatepressedsizebig.css";
interface DarkModeyesthemegreentypeprimarystatepressedsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_25975?: React.ReactNode;
    slot_1_25976?: React.ReactNode;
    slot_1_25977?: React.ReactNode;
    slot_1_25978?: React.ReactNode;
}
const DarkModeyesthemegreentypeprimarystatepressedsizebig = (
    props: DarkModeyesthemegreentypeprimarystatepressedsizebigProps
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
        slot_1_25975,
        slot_1_25976,
        slot_1_25977,
        slot_1_25978
    } = props;

    return (
        <div
            className={["component-1_25974", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_25974"
                className="Pixso-symbol-1_25974 fill-dark-green_primary-pressed-1_10455 pixso-relative-flex"
            >
                {slot_1_25975 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_25975"
                            className="Pixso-instance-1_25975 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_25976 ??
                    (visible_4958_252 && (
                        <p
                            id="1_25976"
                            className="Pixso-paragraph-1_25976 fill-dark_contentprimary-1_10529-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_25977 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemegreentypeonaccentsizebig
                            id="1_25977"
                            className="Pixso-instance-1_25977 pixso-relative-no-shrink"
                        ></Darkmodeyesthemegreentypeonaccentsizebig>
                    ))}
                {slot_1_25978 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_25978"
                            className="Pixso-instance-1_25978 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypeprimarystatepressedsizebig;
