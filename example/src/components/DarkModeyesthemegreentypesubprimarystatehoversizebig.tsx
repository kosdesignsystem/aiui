import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemegreentypeaccentsizebig from "@/components/Darkmodeyesthemegreentypeaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemegreentypesubprimarystatehoversizebig.css";
interface DarkModeyesthemegreentypesubprimarystatehoversizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26060?: React.ReactNode;
    slot_1_26061?: React.ReactNode;
    slot_1_26062?: React.ReactNode;
    slot_1_26063?: React.ReactNode;
}
const DarkModeyesthemegreentypesubprimarystatehoversizebig = (
    props: DarkModeyesthemegreentypesubprimarystatehoversizebigProps
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
        slot_1_26060,
        slot_1_26061,
        slot_1_26062,
        slot_1_26063
    } = props;

    return (
        <div
            className={["component-1_26059", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26059"
                className="Pixso-symbol-1_26059 fill-dark-green_secondary-hover-1_10467 pixso-relative-flex"
            >
                {slot_1_26060 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26060"
                            className="Pixso-instance-1_26060 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26061 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26061"
                            className="Pixso-paragraph-1_26061 fill-greenprimary-1_30120-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26062 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemegreentypeaccentsizebig
                            id="1_26062"
                            className="Pixso-instance-1_26062 pixso-relative-no-shrink"
                        ></Darkmodeyesthemegreentypeaccentsizebig>
                    ))}
                {slot_1_26063 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26063"
                            className="Pixso-instance-1_26063 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypesubprimarystatehoversizebig;
