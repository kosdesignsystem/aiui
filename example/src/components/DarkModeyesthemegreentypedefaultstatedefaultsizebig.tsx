import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemegreentypedefaultsizebig from "@/components/Darkmodeyesthemegreentypedefaultsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemegreentypedefaultstatedefaultsizebig.css";
interface DarkModeyesthemegreentypedefaultstatedefaultsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26235?: React.ReactNode;
    slot_1_26236?: React.ReactNode;
    slot_1_26237?: React.ReactNode;
    slot_1_26238?: React.ReactNode;
}
const DarkModeyesthemegreentypedefaultstatedefaultsizebig = (
    props: DarkModeyesthemegreentypedefaultstatedefaultsizebigProps
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
        slot_1_26235,
        slot_1_26236,
        slot_1_26237,
        slot_1_26238
    } = props;

    return (
        <div
            className={["component-1_26234", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26234"
                className="Pixso-symbol-1_26234 pixso-relative-flex"
            >
                {slot_1_26235 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26235"
                            className="Pixso-instance-1_26235 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26236 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26236"
                            className="Pixso-paragraph-1_26236 fill-dark_contentprimary-1_10529-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26237 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemegreentypedefaultsizebig
                            id="1_26237"
                            className="Pixso-instance-1_26237 pixso-relative-no-shrink"
                        ></Darkmodeyesthemegreentypedefaultsizebig>
                    ))}
                {slot_1_26238 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26238"
                            className="Pixso-instance-1_26238 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypedefaultstatedefaultsizebig;
