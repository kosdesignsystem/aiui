import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemegreentypeaccentsizebig from "@/components/Darkmodeyesthemegreentypeaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemegreentypesecondarystatehoversizebig.css";
interface DarkModeyesthemegreentypesecondarystatehoversizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26150?: React.ReactNode;
    slot_1_26151?: React.ReactNode;
    slot_1_26152?: React.ReactNode;
    slot_1_26153?: React.ReactNode;
}
const DarkModeyesthemegreentypesecondarystatehoversizebig = (
    props: DarkModeyesthemegreentypesecondarystatehoversizebigProps
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
        slot_1_26150,
        slot_1_26151,
        slot_1_26152,
        slot_1_26153
    } = props;

    return (
        <div
            className={["component-1_26149", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26149"
                className="Pixso-symbol-1_26149 fill-dark-default_primary-hover-1_10479 pixso-relative-flex"
            >
                {slot_1_26150 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26150"
                            className="Pixso-instance-1_26150 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26151 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26151"
                            className="Pixso-paragraph-1_26151 fill-dark_contentprimary-1_10529-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26152 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemegreentypeaccentsizebig
                            id="1_26152"
                            className="Pixso-instance-1_26152 pixso-relative-no-shrink"
                        ></Darkmodeyesthemegreentypeaccentsizebig>
                    ))}
                {slot_1_26153 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26153"
                            className="Pixso-instance-1_26153 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypesecondarystatehoversizebig;
