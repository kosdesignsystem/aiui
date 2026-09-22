import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemegreentypedefaultsizebig from "@/components/Darkmodeyesthemegreentypedefaultsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemegreentypedefaultstatehoversizebig.css";
interface DarkModeyesthemegreentypedefaultstatehoversizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26240?: React.ReactNode;
    slot_1_26241?: React.ReactNode;
    slot_1_26242?: React.ReactNode;
    slot_1_26243?: React.ReactNode;
}
const DarkModeyesthemegreentypedefaultstatehoversizebig = (
    props: DarkModeyesthemegreentypedefaultstatehoversizebigProps
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
        slot_1_26240,
        slot_1_26241,
        slot_1_26242,
        slot_1_26243
    } = props;

    return (
        <div
            className={["component-1_26239", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26239"
                className="Pixso-symbol-1_26239 fill-dark-default_secondary-hover-1_10483 pixso-relative-flex"
            >
                {slot_1_26240 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26240"
                            className="Pixso-instance-1_26240 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26241 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26241"
                            className="Pixso-paragraph-1_26241 fill-dark_contentprimary-1_10529-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26242 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemegreentypedefaultsizebig
                            id="1_26242"
                            className="Pixso-instance-1_26242 pixso-relative-no-shrink"
                        ></Darkmodeyesthemegreentypedefaultsizebig>
                    ))}
                {slot_1_26243 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26243"
                            className="Pixso-instance-1_26243 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypedefaultstatehoversizebig;
