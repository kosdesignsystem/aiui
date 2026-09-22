import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemegreentypeaccentsizesmall from "@/components/Darkmodeyesthemegreentypeaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemegreentypesecondarystatedefaultsizesmall.css";
interface DarkModeyesthemegreentypesecondarystatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26595?: React.ReactNode;
    slot_1_26596?: React.ReactNode;
    slot_1_26597?: React.ReactNode;
    slot_1_26598?: React.ReactNode;
}
const DarkModeyesthemegreentypesecondarystatedefaultsizesmall = (
    props: DarkModeyesthemegreentypesecondarystatedefaultsizesmallProps
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
        slot_1_26595,
        slot_1_26596,
        slot_1_26597,
        slot_1_26598
    } = props;

    return (
        <div
            className={["component-1_26594", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26594"
                className="Pixso-symbol-1_26594 fill-dark_contentplashka-1_30095 pixso-relative-flex"
            >
                {slot_1_26595 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26595"
                            className="Pixso-instance-1_26595 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26596 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26596"
                            className="Pixso-paragraph-1_26596 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26597 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemegreentypeaccentsizesmall
                            id="1_26597"
                            className="Pixso-instance-1_26597 pixso-relative-no-shrink"
                        ></Darkmodeyesthemegreentypeaccentsizesmall>
                    ))}
                {slot_1_26598 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26598"
                            className="Pixso-instance-1_26598 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypesecondarystatedefaultsizesmall;
