import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemepurpletypeaccentsizesmall from "@/components/Darkmodeyesthemepurpletypeaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemepurpletypesubprimarystatedefaultsizesmall.css";
interface DarkModeyesthemepurpletypesubprimarystatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26535?: React.ReactNode;
    slot_1_26536?: React.ReactNode;
    slot_1_26537?: React.ReactNode;
    slot_1_26538?: React.ReactNode;
}
const DarkModeyesthemepurpletypesubprimarystatedefaultsizesmall = (
    props: DarkModeyesthemepurpletypesubprimarystatedefaultsizesmallProps
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
        slot_1_26535,
        slot_1_26536,
        slot_1_26537,
        slot_1_26538
    } = props;

    return (
        <div
            className={["component-1_26534", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26534"
                className="Pixso-symbol-1_26534 fill-purpleplashka-1_30124 pixso-relative-flex"
            >
                {slot_1_26535 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26535"
                            className="Pixso-instance-1_26535 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26536 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26536"
                            className="Pixso-paragraph-1_26536 fill-purpleprimary-1_30121-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26537 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemepurpletypeaccentsizesmall
                            id="1_26537"
                            className="Pixso-instance-1_26537 pixso-relative-no-shrink"
                        ></Darkmodeyesthemepurpletypeaccentsizesmall>
                    ))}
                {slot_1_26538 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26538"
                            className="Pixso-instance-1_26538 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypesubprimarystatedefaultsizesmall;
