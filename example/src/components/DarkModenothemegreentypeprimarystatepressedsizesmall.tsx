import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemegreentypeonaccentsizesmall from "@/components/Darkmodenothemegreentypeonaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemegreentypeprimarystatepressedsizesmall.css";
interface DarkModenothemegreentypeprimarystatepressedsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26410?: React.ReactNode;
    slot_1_26411?: React.ReactNode;
    slot_1_26412?: React.ReactNode;
    slot_1_26413?: React.ReactNode;
}
const DarkModenothemegreentypeprimarystatepressedsizesmall = (
    props: DarkModenothemegreentypeprimarystatepressedsizesmallProps
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
        slot_1_26410,
        slot_1_26411,
        slot_1_26412,
        slot_1_26413
    } = props;

    return (
        <div
            className={["component-1_26409", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26409"
                className="Pixso-symbol-1_26409 fill-light-green_primary-pressed-1_10454 pixso-relative-flex"
            >
                {slot_1_26410 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26410"
                            className="Pixso-instance-1_26410 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26411 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26411"
                            className="Pixso-paragraph-1_26411 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26412 ??
                    (visible_4958_42 && (
                        <Darkmodenothemegreentypeonaccentsizesmall
                            id="1_26412"
                            className="Pixso-instance-1_26412 pixso-relative-no-shrink"
                        ></Darkmodenothemegreentypeonaccentsizesmall>
                    ))}
                {slot_1_26413 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26413"
                            className="Pixso-instance-1_26413 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypeprimarystatepressedsizesmall;
