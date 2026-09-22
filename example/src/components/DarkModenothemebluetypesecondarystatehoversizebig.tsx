import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemebluetypeaccentsizebig from "@/components/Darkmodenothemebluetypeaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemebluetypesecondarystatehoversizebig.css";
interface DarkModenothemebluetypesecondarystatehoversizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26105?: React.ReactNode;
    slot_1_26106?: React.ReactNode;
    slot_1_26107?: React.ReactNode;
    slot_1_26108?: React.ReactNode;
}
const DarkModenothemebluetypesecondarystatehoversizebig = (
    props: DarkModenothemebluetypesecondarystatehoversizebigProps
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
        slot_1_26105,
        slot_1_26106,
        slot_1_26107,
        slot_1_26108
    } = props;

    return (
        <div
            className={["component-1_26104", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26104"
                className="Pixso-symbol-1_26104 fill-light-default_primary-hover-1_10478 pixso-relative-flex"
            >
                {slot_1_26105 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26105"
                            className="Pixso-instance-1_26105 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26106 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26106"
                            className="Pixso-paragraph-1_26106 fill-light_contentprimary-1_10528-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26107 ??
                    (visible_4958_42 && (
                        <Darkmodenothemebluetypeaccentsizebig
                            id="1_26107"
                            className="Pixso-instance-1_26107 pixso-relative-no-shrink"
                        ></Darkmodenothemebluetypeaccentsizebig>
                    ))}
                {slot_1_26108 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26108"
                            className="Pixso-instance-1_26108 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypesecondarystatehoversizebig;
