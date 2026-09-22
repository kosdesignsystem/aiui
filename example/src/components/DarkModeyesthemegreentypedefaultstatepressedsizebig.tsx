import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemegreentypedefaultsizebig from "@/components/Darkmodeyesthemegreentypedefaultsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemegreentypedefaultstatepressedsizebig.css";
interface DarkModeyesthemegreentypedefaultstatepressedsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26245?: React.ReactNode;
    slot_1_26246?: React.ReactNode;
    slot_1_26247?: React.ReactNode;
    slot_1_26248?: React.ReactNode;
}
const DarkModeyesthemegreentypedefaultstatepressedsizebig = (
    props: DarkModeyesthemegreentypedefaultstatepressedsizebigProps
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
        slot_1_26245,
        slot_1_26246,
        slot_1_26247,
        slot_1_26248
    } = props;

    return (
        <div
            className={["component-1_26244", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26244"
                className="Pixso-symbol-1_26244 fill-dark-default_secondary-pressed-1_10485 pixso-relative-flex"
            >
                {slot_1_26245 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26245"
                            className="Pixso-instance-1_26245 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26246 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26246"
                            className="Pixso-paragraph-1_26246 fill-dark_contentprimary-1_10529-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26247 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemegreentypedefaultsizebig
                            id="1_26247"
                            className="Pixso-instance-1_26247 pixso-relative-no-shrink"
                        ></Darkmodeyesthemegreentypedefaultsizebig>
                    ))}
                {slot_1_26248 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26248"
                            className="Pixso-instance-1_26248 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypedefaultstatepressedsizebig;
