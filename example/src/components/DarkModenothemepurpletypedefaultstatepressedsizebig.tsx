import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemepurpletypedefaultsizebig from "@/components/Darkmodenothemepurpletypedefaultsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemepurpletypedefaultstatepressedsizebig.css";
interface DarkModenothemepurpletypedefaultstatepressedsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26260?: React.ReactNode;
    slot_1_26261?: React.ReactNode;
    slot_1_26262?: React.ReactNode;
    slot_1_26263?: React.ReactNode;
}
const DarkModenothemepurpletypedefaultstatepressedsizebig = (
    props: DarkModenothemepurpletypedefaultstatepressedsizebigProps
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
        slot_1_26260,
        slot_1_26261,
        slot_1_26262,
        slot_1_26263
    } = props;

    return (
        <div
            className={["component-1_26259", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26259"
                className="Pixso-symbol-1_26259 fill-light-default_secondary-pressed-1_10484 pixso-relative-flex"
            >
                {slot_1_26260 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26260"
                            className="Pixso-instance-1_26260 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26261 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26261"
                            className="Pixso-paragraph-1_26261 fill-light_contentprimary-1_10528-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26262 ??
                    (visible_4958_42 && (
                        <Darkmodenothemepurpletypedefaultsizebig
                            id="1_26262"
                            className="Pixso-instance-1_26262 pixso-relative-no-shrink"
                        ></Darkmodenothemepurpletypedefaultsizebig>
                    ))}
                {slot_1_26263 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26263"
                            className="Pixso-instance-1_26263 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypedefaultstatepressedsizebig;
