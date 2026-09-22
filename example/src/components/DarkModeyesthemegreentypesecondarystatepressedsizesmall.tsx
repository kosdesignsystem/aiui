import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemegreentypeaccentsizesmall from "@/components/Darkmodeyesthemegreentypeaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemegreentypesecondarystatepressedsizesmall.css";
interface DarkModeyesthemegreentypesecondarystatepressedsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26605?: React.ReactNode;
    slot_1_26606?: React.ReactNode;
    slot_1_26607?: React.ReactNode;
    slot_1_26608?: React.ReactNode;
}
const DarkModeyesthemegreentypesecondarystatepressedsizesmall = (
    props: DarkModeyesthemegreentypesecondarystatepressedsizesmallProps
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
        slot_1_26605,
        slot_1_26606,
        slot_1_26607,
        slot_1_26608
    } = props;

    return (
        <div
            className={["component-1_26604", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26604"
                className="Pixso-symbol-1_26604 fill-dark-default_primary-pressed-1_10481 pixso-relative-flex"
            >
                {slot_1_26605 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26605"
                            className="Pixso-instance-1_26605 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26606 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26606"
                            className="Pixso-paragraph-1_26606 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26607 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemegreentypeaccentsizesmall
                            id="1_26607"
                            className="Pixso-instance-1_26607 pixso-relative-no-shrink"
                        ></Darkmodeyesthemegreentypeaccentsizesmall>
                    ))}
                {slot_1_26608 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26608"
                            className="Pixso-instance-1_26608 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypesecondarystatepressedsizesmall;
