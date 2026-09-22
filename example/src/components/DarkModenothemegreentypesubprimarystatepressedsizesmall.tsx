import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemegreentypeaccentsizesmall from "@/components/Darkmodenothemegreentypeaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemegreentypesubprimarystatepressedsizesmall.css";
interface DarkModenothemegreentypesubprimarystatepressedsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26500?: React.ReactNode;
    slot_1_26501?: React.ReactNode;
    slot_1_26502?: React.ReactNode;
    slot_1_26503?: React.ReactNode;
}
const DarkModenothemegreentypesubprimarystatepressedsizesmall = (
    props: DarkModenothemegreentypesubprimarystatepressedsizesmallProps
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
        slot_1_26500,
        slot_1_26501,
        slot_1_26502,
        slot_1_26503
    } = props;

    return (
        <div
            className={["component-1_26499", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26499"
                className="Pixso-symbol-1_26499 fill-light-green_secondary-pressed-1_10468 pixso-relative-flex"
            >
                {slot_1_26500 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26500"
                            className="Pixso-instance-1_26500 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26501 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26501"
                            className="Pixso-paragraph-1_26501 fill-greenprimary-1_30120-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26502 ??
                    (visible_4958_42 && (
                        <Darkmodenothemegreentypeaccentsizesmall
                            id="1_26502"
                            className="Pixso-instance-1_26502 pixso-relative-no-shrink"
                        ></Darkmodenothemegreentypeaccentsizesmall>
                    ))}
                {slot_1_26503 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26503"
                            className="Pixso-instance-1_26503 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypesubprimarystatepressedsizesmall;
