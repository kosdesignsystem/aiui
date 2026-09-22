import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemegreentypeaccentsizesmall from "@/components/Darkmodeyesthemegreentypeaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemegreentypesecondarystatehoversizesmall.css";
interface DarkModeyesthemegreentypesecondarystatehoversizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26600?: React.ReactNode;
    slot_1_26601?: React.ReactNode;
    slot_1_26602?: React.ReactNode;
    slot_1_26603?: React.ReactNode;
}
const DarkModeyesthemegreentypesecondarystatehoversizesmall = (
    props: DarkModeyesthemegreentypesecondarystatehoversizesmallProps
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
        slot_1_26600,
        slot_1_26601,
        slot_1_26602,
        slot_1_26603
    } = props;

    return (
        <div
            className={["component-1_26599", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26599"
                className="Pixso-symbol-1_26599 fill-dark-default_primary-hover-1_10479 pixso-relative-flex"
            >
                {slot_1_26600 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26600"
                            className="Pixso-instance-1_26600 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26601 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26601"
                            className="Pixso-paragraph-1_26601 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26602 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemegreentypeaccentsizesmall
                            id="1_26602"
                            className="Pixso-instance-1_26602 pixso-relative-no-shrink"
                        ></Darkmodeyesthemegreentypeaccentsizesmall>
                    ))}
                {slot_1_26603 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26603"
                            className="Pixso-instance-1_26603 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypesecondarystatehoversizesmall;
