import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemepurpletypedefaultsizesmall from "@/components/Darkmodenothemepurpletypedefaultsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemepurpletypedefaultstatepressedsizesmall.css";
interface DarkModenothemepurpletypedefaultstatepressedsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26710?: React.ReactNode;
    slot_1_26711?: React.ReactNode;
    slot_1_26712?: React.ReactNode;
    slot_1_26713?: React.ReactNode;
}
const DarkModenothemepurpletypedefaultstatepressedsizesmall = (
    props: DarkModenothemepurpletypedefaultstatepressedsizesmallProps
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
        slot_1_26710,
        slot_1_26711,
        slot_1_26712,
        slot_1_26713
    } = props;

    return (
        <div
            className={["component-1_26709", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26709"
                className="Pixso-symbol-1_26709 fill-light-default_secondary-pressed-1_10484 pixso-relative-flex"
            >
                {slot_1_26710 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26710"
                            className="Pixso-instance-1_26710 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26711 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26711"
                            className="Pixso-paragraph-1_26711 fill-light_contentprimary-1_10528-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26712 ??
                    (visible_4958_42 && (
                        <Darkmodenothemepurpletypedefaultsizesmall
                            id="1_26712"
                            className="Pixso-instance-1_26712 pixso-relative-no-shrink"
                        ></Darkmodenothemepurpletypedefaultsizesmall>
                    ))}
                {slot_1_26713 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26713"
                            className="Pixso-instance-1_26713 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypedefaultstatepressedsizesmall;
