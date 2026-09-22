import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemegreentypedefaultsizebig from "@/components/Darkmodenothemegreentypedefaultsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemegreentypedefaultstatehoversizebig.css";
interface DarkModenothemegreentypedefaultstatehoversizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26225?: React.ReactNode;
    slot_1_26226?: React.ReactNode;
    slot_1_26227?: React.ReactNode;
    slot_1_26228?: React.ReactNode;
}
const DarkModenothemegreentypedefaultstatehoversizebig = (
    props: DarkModenothemegreentypedefaultstatehoversizebigProps
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
        slot_1_26225,
        slot_1_26226,
        slot_1_26227,
        slot_1_26228
    } = props;

    return (
        <div
            className={["component-1_26224", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26224"
                className="Pixso-symbol-1_26224 fill-light-default_secondary-hover-1_10482 pixso-relative-flex"
            >
                {slot_1_26225 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26225"
                            className="Pixso-instance-1_26225 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26226 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26226"
                            className="Pixso-paragraph-1_26226 fill-light_contentprimary-1_10528-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26227 ??
                    (visible_4958_42 && (
                        <Darkmodenothemegreentypedefaultsizebig
                            id="1_26227"
                            className="Pixso-instance-1_26227 pixso-relative-no-shrink"
                        ></Darkmodenothemegreentypedefaultsizebig>
                    ))}
                {slot_1_26228 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26228"
                            className="Pixso-instance-1_26228 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypedefaultstatehoversizebig;
