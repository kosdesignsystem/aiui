import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemegreentypeonaccentsizebig from "@/components/Darkmodenothemegreentypeonaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemegreentypeprimarystatepressedsizebig.css";
interface DarkModenothemegreentypeprimarystatepressedsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_25960?: React.ReactNode;
    slot_1_25961?: React.ReactNode;
    slot_1_25962?: React.ReactNode;
    slot_1_25963?: React.ReactNode;
}
const DarkModenothemegreentypeprimarystatepressedsizebig = (
    props: DarkModenothemegreentypeprimarystatepressedsizebigProps
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
        slot_1_25960,
        slot_1_25961,
        slot_1_25962,
        slot_1_25963
    } = props;

    return (
        <div
            className={["component-1_25959", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_25959"
                className="Pixso-symbol-1_25959 fill-light-green_primary-pressed-1_10454 pixso-relative-flex"
            >
                {slot_1_25960 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_25960"
                            className="Pixso-instance-1_25960 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_25961 ??
                    (visible_4958_252 && (
                        <p
                            id="1_25961"
                            className="Pixso-paragraph-1_25961 fill-dark_contentprimary-1_10529-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_25962 ??
                    (visible_4958_42 && (
                        <Darkmodenothemegreentypeonaccentsizebig
                            id="1_25962"
                            className="Pixso-instance-1_25962 pixso-relative-no-shrink"
                        ></Darkmodenothemegreentypeonaccentsizebig>
                    ))}
                {slot_1_25963 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_25963"
                            className="Pixso-instance-1_25963 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypeprimarystatepressedsizebig;
