import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemepurpletypedefaultsizebig from "@/components/Darkmodeyesthemepurpletypedefaultsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemepurpletypedefaultstatedefaultsizebig.css";
interface DarkModeyesthemepurpletypedefaultstatedefaultsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26265?: React.ReactNode;
    slot_1_26266?: React.ReactNode;
    slot_1_26267?: React.ReactNode;
    slot_1_26268?: React.ReactNode;
}
const DarkModeyesthemepurpletypedefaultstatedefaultsizebig = (
    props: DarkModeyesthemepurpletypedefaultstatedefaultsizebigProps
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
        slot_1_26265,
        slot_1_26266,
        slot_1_26267,
        slot_1_26268
    } = props;

    return (
        <div
            className={["component-1_26264", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26264"
                className="Pixso-symbol-1_26264 pixso-relative-flex"
            >
                {slot_1_26265 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26265"
                            className="Pixso-instance-1_26265 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26266 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26266"
                            className="Pixso-paragraph-1_26266 fill-dark_contentprimary-1_10529-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26267 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemepurpletypedefaultsizebig
                            id="1_26267"
                            className="Pixso-instance-1_26267 pixso-relative-no-shrink"
                        ></Darkmodeyesthemepurpletypedefaultsizebig>
                    ))}
                {slot_1_26268 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26268"
                            className="Pixso-instance-1_26268 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypedefaultstatedefaultsizebig;
