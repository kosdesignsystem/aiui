import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemegreentypeonaccentsizesmall from "@/components/Darkmodeyesthemegreentypeonaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemegreentypeprimarystatepressedsizesmall.css";
interface DarkModeyesthemegreentypeprimarystatepressedsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26425?: React.ReactNode;
    slot_1_26426?: React.ReactNode;
    slot_1_26427?: React.ReactNode;
    slot_1_26428?: React.ReactNode;
}
const DarkModeyesthemegreentypeprimarystatepressedsizesmall = (
    props: DarkModeyesthemegreentypeprimarystatepressedsizesmallProps
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
        slot_1_26425,
        slot_1_26426,
        slot_1_26427,
        slot_1_26428
    } = props;

    return (
        <div
            className={["component-1_26424", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26424"
                className="Pixso-symbol-1_26424 fill-dark-green_primary-pressed-1_10455 pixso-relative-flex"
            >
                {slot_1_26425 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26425"
                            className="Pixso-instance-1_26425 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26426 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26426"
                            className="Pixso-paragraph-1_26426 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26427 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemegreentypeonaccentsizesmall
                            id="1_26427"
                            className="Pixso-instance-1_26427 pixso-relative-no-shrink"
                        ></Darkmodeyesthemegreentypeonaccentsizesmall>
                    ))}
                {slot_1_26428 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26428"
                            className="Pixso-instance-1_26428 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypeprimarystatepressedsizesmall;
