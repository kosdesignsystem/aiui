import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemebluetypeaccentsizesmall from "@/components/Darkmodenothemebluetypeaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemebluetypesecondarystatehoversizesmall.css";
interface DarkModenothemebluetypesecondarystatehoversizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26555?: React.ReactNode;
    slot_1_26556?: React.ReactNode;
    slot_1_26557?: React.ReactNode;
    slot_1_26558?: React.ReactNode;
}
const DarkModenothemebluetypesecondarystatehoversizesmall = (
    props: DarkModenothemebluetypesecondarystatehoversizesmallProps
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
        slot_1_26555,
        slot_1_26556,
        slot_1_26557,
        slot_1_26558
    } = props;

    return (
        <div
            className={["component-1_26554", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26554"
                className="Pixso-symbol-1_26554 fill-light-default_primary-hover-1_10478 pixso-relative-flex"
            >
                {slot_1_26555 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26555"
                            className="Pixso-instance-1_26555 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26556 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26556"
                            className="Pixso-paragraph-1_26556 fill-light_contentprimary-1_10528-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26557 ??
                    (visible_4958_42 && (
                        <Darkmodenothemebluetypeaccentsizesmall
                            id="1_26557"
                            className="Pixso-instance-1_26557 pixso-relative-no-shrink"
                        ></Darkmodenothemebluetypeaccentsizesmall>
                    ))}
                {slot_1_26558 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26558"
                            className="Pixso-instance-1_26558 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypesecondarystatehoversizesmall;
