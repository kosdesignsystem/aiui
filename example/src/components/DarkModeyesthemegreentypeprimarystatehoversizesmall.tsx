import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemegreentypeonaccentsizesmall from "@/components/Darkmodeyesthemegreentypeonaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemegreentypeprimarystatehoversizesmall.css";
interface DarkModeyesthemegreentypeprimarystatehoversizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26420?: React.ReactNode;
    slot_1_26421?: React.ReactNode;
    slot_1_26422?: React.ReactNode;
    slot_1_26423?: React.ReactNode;
}
const DarkModeyesthemegreentypeprimarystatehoversizesmall = (
    props: DarkModeyesthemegreentypeprimarystatehoversizesmallProps
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
        slot_1_26420,
        slot_1_26421,
        slot_1_26422,
        slot_1_26423
    } = props;

    return (
        <div
            className={["component-1_26419", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26419"
                className="Pixso-symbol-1_26419 fill-dark-green_primary-hover-1_10453 pixso-relative-flex"
            >
                {slot_1_26420 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26420"
                            className="Pixso-instance-1_26420 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26421 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26421"
                            className="Pixso-paragraph-1_26421 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26422 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemegreentypeonaccentsizesmall
                            id="1_26422"
                            className="Pixso-instance-1_26422 pixso-relative-no-shrink"
                        ></Darkmodeyesthemegreentypeonaccentsizesmall>
                    ))}
                {slot_1_26423 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26423"
                            className="Pixso-instance-1_26423 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypeprimarystatehoversizesmall;
