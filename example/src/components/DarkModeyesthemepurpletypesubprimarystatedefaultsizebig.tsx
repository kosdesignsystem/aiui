import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemepurpletypeaccentsizebig from "@/components/Darkmodeyesthemepurpletypeaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemepurpletypesubprimarystatedefaultsizebig.css";
interface DarkModeyesthemepurpletypesubprimarystatedefaultsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26085?: React.ReactNode;
    slot_1_26086?: React.ReactNode;
    slot_1_26087?: React.ReactNode;
    slot_1_26088?: React.ReactNode;
}
const DarkModeyesthemepurpletypesubprimarystatedefaultsizebig = (
    props: DarkModeyesthemepurpletypesubprimarystatedefaultsizebigProps
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
        slot_1_26085,
        slot_1_26086,
        slot_1_26087,
        slot_1_26088
    } = props;

    return (
        <div
            className={["component-1_26084", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26084"
                className="Pixso-symbol-1_26084 fill-purpleplashka-1_30124 pixso-relative-flex"
            >
                {slot_1_26085 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26085"
                            className="Pixso-instance-1_26085 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26086 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26086"
                            className="Pixso-paragraph-1_26086 fill-purpleprimary-1_30121-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26087 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemepurpletypeaccentsizebig
                            id="1_26087"
                            className="Pixso-instance-1_26087 pixso-relative-no-shrink"
                        ></Darkmodeyesthemepurpletypeaccentsizebig>
                    ))}
                {slot_1_26088 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26088"
                            className="Pixso-instance-1_26088 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypesubprimarystatedefaultsizebig;
