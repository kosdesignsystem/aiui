import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemepurpletypeaccentsizesmall from "@/components/Darkmodeyesthemepurpletypeaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemepurpletypesecondarystatepressedsizesmall.css";
interface DarkModeyesthemepurpletypesecondarystatepressedsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26635?: React.ReactNode;
    slot_1_26636?: React.ReactNode;
    slot_1_26637?: React.ReactNode;
    slot_1_26638?: React.ReactNode;
}
const DarkModeyesthemepurpletypesecondarystatepressedsizesmall = (
    props: DarkModeyesthemepurpletypesecondarystatepressedsizesmallProps
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
        slot_1_26635,
        slot_1_26636,
        slot_1_26637,
        slot_1_26638
    } = props;

    return (
        <div
            className={["component-1_26634", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26634"
                className="Pixso-symbol-1_26634 fill-dark-default_primary-pressed-1_10481 pixso-relative-flex"
            >
                {slot_1_26635 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26635"
                            className="Pixso-instance-1_26635 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26636 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26636"
                            className="Pixso-paragraph-1_26636 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26637 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemepurpletypeaccentsizesmall
                            id="1_26637"
                            className="Pixso-instance-1_26637 pixso-relative-no-shrink"
                        ></Darkmodeyesthemepurpletypeaccentsizesmall>
                    ))}
                {slot_1_26638 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26638"
                            className="Pixso-instance-1_26638 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypesecondarystatepressedsizesmall;
