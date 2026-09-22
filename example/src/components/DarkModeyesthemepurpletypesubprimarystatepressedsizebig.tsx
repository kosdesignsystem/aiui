import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemepurpletypeaccentsizebig from "@/components/Darkmodeyesthemepurpletypeaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemepurpletypesubprimarystatepressedsizebig.css";
interface DarkModeyesthemepurpletypesubprimarystatepressedsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26095?: React.ReactNode;
    slot_1_26096?: React.ReactNode;
    slot_1_26097?: React.ReactNode;
    slot_1_26098?: React.ReactNode;
}
const DarkModeyesthemepurpletypesubprimarystatepressedsizebig = (
    props: DarkModeyesthemepurpletypesubprimarystatepressedsizebigProps
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
        slot_1_26095,
        slot_1_26096,
        slot_1_26097,
        slot_1_26098
    } = props;

    return (
        <div
            className={["component-1_26094", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26094"
                className="Pixso-symbol-1_26094 fill-dark-purple_secondary-pressed-1_10474 pixso-relative-flex"
            >
                {slot_1_26095 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26095"
                            className="Pixso-instance-1_26095 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26096 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26096"
                            className="Pixso-paragraph-1_26096 fill-purpleprimary-1_30121-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26097 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemepurpletypeaccentsizebig
                            id="1_26097"
                            className="Pixso-instance-1_26097 pixso-relative-no-shrink"
                        ></Darkmodeyesthemepurpletypeaccentsizebig>
                    ))}
                {slot_1_26098 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26098"
                            className="Pixso-instance-1_26098 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypesubprimarystatepressedsizebig;
