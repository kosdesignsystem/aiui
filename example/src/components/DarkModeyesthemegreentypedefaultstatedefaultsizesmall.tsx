import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemegreentypedefaultsizesmall from "@/components/Darkmodeyesthemegreentypedefaultsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemegreentypedefaultstatedefaultsizesmall.css";
interface DarkModeyesthemegreentypedefaultstatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26685?: React.ReactNode;
    slot_1_26686?: React.ReactNode;
    slot_1_26687?: React.ReactNode;
    slot_1_26688?: React.ReactNode;
}
const DarkModeyesthemegreentypedefaultstatedefaultsizesmall = (
    props: DarkModeyesthemegreentypedefaultstatedefaultsizesmallProps
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
        slot_1_26685,
        slot_1_26686,
        slot_1_26687,
        slot_1_26688
    } = props;

    return (
        <div
            className={["component-1_26684", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26684"
                className="Pixso-symbol-1_26684 pixso-relative-flex"
            >
                {slot_1_26685 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26685"
                            className="Pixso-instance-1_26685 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26686 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26686"
                            className="Pixso-paragraph-1_26686 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26687 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemegreentypedefaultsizesmall
                            id="1_26687"
                            className="Pixso-instance-1_26687 pixso-relative-no-shrink"
                        ></Darkmodeyesthemegreentypedefaultsizesmall>
                    ))}
                {slot_1_26688 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26688"
                            className="Pixso-instance-1_26688 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypedefaultstatedefaultsizesmall;
