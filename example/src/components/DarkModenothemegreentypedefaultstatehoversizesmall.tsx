import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemegreentypedefaultsizesmall from "@/components/Darkmodenothemegreentypedefaultsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemegreentypedefaultstatehoversizesmall.css";
interface DarkModenothemegreentypedefaultstatehoversizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26675?: React.ReactNode;
    slot_1_26676?: React.ReactNode;
    slot_1_26677?: React.ReactNode;
    slot_1_26678?: React.ReactNode;
}
const DarkModenothemegreentypedefaultstatehoversizesmall = (
    props: DarkModenothemegreentypedefaultstatehoversizesmallProps
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
        slot_1_26675,
        slot_1_26676,
        slot_1_26677,
        slot_1_26678
    } = props;

    return (
        <div
            className={["component-1_26674", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26674"
                className="Pixso-symbol-1_26674 fill-light-default_secondary-hover-1_10482 pixso-relative-flex"
            >
                {slot_1_26675 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26675"
                            className="Pixso-instance-1_26675 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26676 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26676"
                            className="Pixso-paragraph-1_26676 fill-light_contentprimary-1_10528-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26677 ??
                    (visible_4958_42 && (
                        <Darkmodenothemegreentypedefaultsizesmall
                            id="1_26677"
                            className="Pixso-instance-1_26677 pixso-relative-no-shrink"
                        ></Darkmodenothemegreentypedefaultsizesmall>
                    ))}
                {slot_1_26678 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26678"
                            className="Pixso-instance-1_26678 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypedefaultstatehoversizesmall;
