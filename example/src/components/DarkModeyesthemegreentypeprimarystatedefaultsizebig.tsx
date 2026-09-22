import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemegreentypeonaccentsizebig from "@/components/Darkmodeyesthemegreentypeonaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemegreentypeprimarystatedefaultsizebig.css";
interface DarkModeyesthemegreentypeprimarystatedefaultsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_25965?: React.ReactNode;
    slot_1_25966?: React.ReactNode;
    slot_1_25967?: React.ReactNode;
    slot_1_25968?: React.ReactNode;
}
const DarkModeyesthemegreentypeprimarystatedefaultsizebig = (
    props: DarkModeyesthemegreentypeprimarystatedefaultsizebigProps
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
        slot_1_25965,
        slot_1_25966,
        slot_1_25967,
        slot_1_25968
    } = props;

    return (
        <div
            className={["component-1_25964", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_25964"
                className="Pixso-symbol-1_25964 fill-greenprimary-1_30120 pixso-relative-flex"
            >
                {slot_1_25965 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_25965"
                            className="Pixso-instance-1_25965 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_25966 ??
                    (visible_4958_252 && (
                        <p
                            id="1_25966"
                            className="Pixso-paragraph-1_25966 fill-dark_contentprimary-1_10529-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_25967 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemegreentypeonaccentsizebig
                            id="1_25967"
                            className="Pixso-instance-1_25967 pixso-relative-no-shrink"
                        ></Darkmodeyesthemegreentypeonaccentsizebig>
                    ))}
                {slot_1_25968 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_25968"
                            className="Pixso-instance-1_25968 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypeprimarystatedefaultsizebig;
