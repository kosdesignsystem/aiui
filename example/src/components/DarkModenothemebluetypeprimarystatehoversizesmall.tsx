import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemebluetypeonaccentsizesmall from "@/components/Darkmodenothemebluetypeonaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemebluetypeprimarystatehoversizesmall.css";
interface DarkModenothemebluetypeprimarystatehoversizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26375?: React.ReactNode;
    slot_1_26376?: React.ReactNode;
    slot_1_26377?: React.ReactNode;
    slot_1_26378?: React.ReactNode;
}
const DarkModenothemebluetypeprimarystatehoversizesmall = (
    props: DarkModenothemebluetypeprimarystatehoversizesmallProps
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
        slot_1_26375,
        slot_1_26376,
        slot_1_26377,
        slot_1_26378
    } = props;

    return (
        <div
            className={["component-1_26374", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26374"
                className="Pixso-symbol-1_26374 fill-lightblue_primaryhover-1_10447 pixso-relative-flex"
            >
                {slot_1_26375 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26375"
                            className="Pixso-instance-1_26375 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26376 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26376"
                            className="Pixso-paragraph-1_26376 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26377 ??
                    (visible_4958_42 && (
                        <Darkmodenothemebluetypeonaccentsizesmall
                            id="1_26377"
                            className="Pixso-instance-1_26377 pixso-relative-no-shrink"
                        ></Darkmodenothemebluetypeonaccentsizesmall>
                    ))}
                {slot_1_26378 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26378"
                            className="Pixso-instance-1_26378 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypeprimarystatehoversizesmall;
