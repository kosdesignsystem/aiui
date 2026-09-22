import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemebluetypedefaultsizebig from "@/components/Darkmodeyesthemebluetypedefaultsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemebluetypedefaultstatehoversizebig.css";
interface DarkModeyesthemebluetypedefaultstatehoversizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26210?: React.ReactNode;
    slot_1_26211?: React.ReactNode;
    slot_1_26212?: React.ReactNode;
    slot_1_26213?: React.ReactNode;
}
const DarkModeyesthemebluetypedefaultstatehoversizebig = (
    props: DarkModeyesthemebluetypedefaultstatehoversizebigProps
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
        slot_1_26210,
        slot_1_26211,
        slot_1_26212,
        slot_1_26213
    } = props;

    return (
        <div
            className={["component-1_26209", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26209"
                className="Pixso-symbol-1_26209 fill-dark-default_secondary-hover-1_10483 pixso-relative-flex"
            >
                {slot_1_26210 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26210"
                            className="Pixso-instance-1_26210 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26211 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26211"
                            className="Pixso-paragraph-1_26211 fill-dark_contentprimary-1_10529-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26212 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemebluetypedefaultsizebig
                            id="1_26212"
                            className="Pixso-instance-1_26212 pixso-relative-no-shrink"
                        ></Darkmodeyesthemebluetypedefaultsizebig>
                    ))}
                {slot_1_26213 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26213"
                            className="Pixso-instance-1_26213 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypedefaultstatehoversizebig;
