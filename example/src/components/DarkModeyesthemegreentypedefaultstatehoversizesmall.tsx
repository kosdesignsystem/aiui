import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemegreentypedefaultsizesmall from "@/components/Darkmodeyesthemegreentypedefaultsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemegreentypedefaultstatehoversizesmall.css";
interface DarkModeyesthemegreentypedefaultstatehoversizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26690?: React.ReactNode;
    slot_1_26691?: React.ReactNode;
    slot_1_26692?: React.ReactNode;
    slot_1_26693?: React.ReactNode;
}
const DarkModeyesthemegreentypedefaultstatehoversizesmall = (
    props: DarkModeyesthemegreentypedefaultstatehoversizesmallProps
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
        slot_1_26690,
        slot_1_26691,
        slot_1_26692,
        slot_1_26693
    } = props;

    return (
        <div
            className={["component-1_26689", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26689"
                className="Pixso-symbol-1_26689 fill-dark-default_secondary-hover-1_10483 pixso-relative-flex"
            >
                {slot_1_26690 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26690"
                            className="Pixso-instance-1_26690 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26691 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26691"
                            className="Pixso-paragraph-1_26691 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26692 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemegreentypedefaultsizesmall
                            id="1_26692"
                            className="Pixso-instance-1_26692 pixso-relative-no-shrink"
                        ></Darkmodeyesthemegreentypedefaultsizesmall>
                    ))}
                {slot_1_26693 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26693"
                            className="Pixso-instance-1_26693 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypedefaultstatehoversizesmall;
