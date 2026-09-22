import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemepurpletypeaccentsizesmall from "@/components/Darkmodeyesthemepurpletypeaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemepurpletypesubprimarystatepressedsizesmall.css";
interface DarkModeyesthemepurpletypesubprimarystatepressedsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26545?: React.ReactNode;
    slot_1_26546?: React.ReactNode;
    slot_1_26547?: React.ReactNode;
    slot_1_26548?: React.ReactNode;
}
const DarkModeyesthemepurpletypesubprimarystatepressedsizesmall = (
    props: DarkModeyesthemepurpletypesubprimarystatepressedsizesmallProps
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
        slot_1_26545,
        slot_1_26546,
        slot_1_26547,
        slot_1_26548
    } = props;

    return (
        <div
            className={["component-1_26544", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26544"
                className="Pixso-symbol-1_26544 fill-dark-purple_secondary-pressed-1_10474 pixso-relative-flex"
            >
                {slot_1_26545 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26545"
                            className="Pixso-instance-1_26545 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26546 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26546"
                            className="Pixso-paragraph-1_26546 fill-purpleprimary-1_30121-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26547 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemepurpletypeaccentsizesmall
                            id="1_26547"
                            className="Pixso-instance-1_26547 pixso-relative-no-shrink"
                        ></Darkmodeyesthemepurpletypeaccentsizesmall>
                    ))}
                {slot_1_26548 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26548"
                            className="Pixso-instance-1_26548 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypesubprimarystatepressedsizesmall;
