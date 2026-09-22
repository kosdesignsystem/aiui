import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemepurpletypeaccentsizebig from "@/components/Darkmodenothemepurpletypeaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemepurpletypesubprimarystatedefaultsizebig.css";
interface DarkModenothemepurpletypesubprimarystatedefaultsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26070?: React.ReactNode;
    slot_1_26071?: React.ReactNode;
    slot_1_26072?: React.ReactNode;
    slot_1_26073?: React.ReactNode;
}
const DarkModenothemepurpletypesubprimarystatedefaultsizebig = (
    props: DarkModenothemepurpletypesubprimarystatedefaultsizebigProps
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
        slot_1_26070,
        slot_1_26071,
        slot_1_26072,
        slot_1_26073
    } = props;

    return (
        <div
            className={["component-1_26069", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26069"
                className="Pixso-symbol-1_26069 fill-purpleplashka-1_30124 pixso-relative-flex"
            >
                {slot_1_26070 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26070"
                            className="Pixso-instance-1_26070 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26071 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26071"
                            className="Pixso-paragraph-1_26071 fill-purpleprimary-1_30121-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26072 ??
                    (visible_4958_42 && (
                        <Darkmodenothemepurpletypeaccentsizebig
                            id="1_26072"
                            className="Pixso-instance-1_26072 pixso-relative-no-shrink"
                        ></Darkmodenothemepurpletypeaccentsizebig>
                    ))}
                {slot_1_26073 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26073"
                            className="Pixso-instance-1_26073 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypesubprimarystatedefaultsizebig;
