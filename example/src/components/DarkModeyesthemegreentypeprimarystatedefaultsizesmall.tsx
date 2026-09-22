import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemegreentypeonaccentsizesmall from "@/components/Darkmodeyesthemegreentypeonaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemegreentypeprimarystatedefaultsizesmall.css";
interface DarkModeyesthemegreentypeprimarystatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26415?: React.ReactNode;
    slot_1_26416?: React.ReactNode;
    slot_1_26417?: React.ReactNode;
    slot_1_26418?: React.ReactNode;
}
const DarkModeyesthemegreentypeprimarystatedefaultsizesmall = (
    props: DarkModeyesthemegreentypeprimarystatedefaultsizesmallProps
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
        slot_1_26415,
        slot_1_26416,
        slot_1_26417,
        slot_1_26418
    } = props;

    return (
        <div
            className={["component-1_26414", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26414"
                className="Pixso-symbol-1_26414 fill-greenprimary-1_30120 pixso-relative-flex"
            >
                {slot_1_26415 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26415"
                            className="Pixso-instance-1_26415 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26416 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26416"
                            className="Pixso-paragraph-1_26416 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26417 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemegreentypeonaccentsizesmall
                            id="1_26417"
                            className="Pixso-instance-1_26417 pixso-relative-no-shrink"
                        ></Darkmodeyesthemegreentypeonaccentsizesmall>
                    ))}
                {slot_1_26418 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26418"
                            className="Pixso-instance-1_26418 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypeprimarystatedefaultsizesmall;
