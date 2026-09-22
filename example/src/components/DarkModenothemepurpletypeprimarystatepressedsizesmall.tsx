import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemepurpletypeonaccentsizesmall from "@/components/Darkmodenothemepurpletypeonaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemepurpletypeprimarystatepressedsizesmall.css";
interface DarkModenothemepurpletypeprimarystatepressedsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26440?: React.ReactNode;
    slot_1_26441?: React.ReactNode;
    slot_1_26442?: React.ReactNode;
    slot_1_26443?: React.ReactNode;
}
const DarkModenothemepurpletypeprimarystatepressedsizesmall = (
    props: DarkModenothemepurpletypeprimarystatepressedsizesmallProps
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
        slot_1_26440,
        slot_1_26441,
        slot_1_26442,
        slot_1_26443
    } = props;

    return (
        <div
            className={["component-1_26439", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26439"
                className="Pixso-symbol-1_26439 fill-light-purple_primary-pressed-1_10458 pixso-relative-flex"
            >
                {slot_1_26440 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26440"
                            className="Pixso-instance-1_26440 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26441 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26441"
                            className="Pixso-paragraph-1_26441 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26442 ??
                    (visible_4958_42 && (
                        <Darkmodenothemepurpletypeonaccentsizesmall
                            id="1_26442"
                            className="Pixso-instance-1_26442 pixso-relative-no-shrink"
                        ></Darkmodenothemepurpletypeonaccentsizesmall>
                    ))}
                {slot_1_26443 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26443"
                            className="Pixso-instance-1_26443 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypeprimarystatepressedsizesmall;
