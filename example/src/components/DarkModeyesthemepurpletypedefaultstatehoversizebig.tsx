import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemepurpletypedefaultsizebig from "@/components/Darkmodeyesthemepurpletypedefaultsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemepurpletypedefaultstatehoversizebig.css";
interface DarkModeyesthemepurpletypedefaultstatehoversizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26270?: React.ReactNode;
    slot_1_26271?: React.ReactNode;
    slot_1_26272?: React.ReactNode;
    slot_1_26273?: React.ReactNode;
}
const DarkModeyesthemepurpletypedefaultstatehoversizebig = (
    props: DarkModeyesthemepurpletypedefaultstatehoversizebigProps
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
        slot_1_26270,
        slot_1_26271,
        slot_1_26272,
        slot_1_26273
    } = props;

    return (
        <div
            className={["component-1_26269", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26269"
                className="Pixso-symbol-1_26269 fill-dark-default_secondary-hover-1_10483 pixso-relative-flex"
            >
                {slot_1_26270 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26270"
                            className="Pixso-instance-1_26270 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26271 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26271"
                            className="Pixso-paragraph-1_26271 fill-dark_contentprimary-1_10529-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26272 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemepurpletypedefaultsizebig
                            id="1_26272"
                            className="Pixso-instance-1_26272 pixso-relative-no-shrink"
                        ></Darkmodeyesthemepurpletypedefaultsizebig>
                    ))}
                {slot_1_26273 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26273"
                            className="Pixso-instance-1_26273 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypedefaultstatehoversizebig;
