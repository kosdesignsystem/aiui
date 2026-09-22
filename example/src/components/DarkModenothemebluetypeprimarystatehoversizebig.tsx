import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemebluetypeonaccentsizebig from "@/components/Darkmodenothemebluetypeonaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemebluetypeprimarystatehoversizebig.css";
interface DarkModenothemebluetypeprimarystatehoversizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_25925?: React.ReactNode;
    slot_1_25926?: React.ReactNode;
    slot_1_25927?: React.ReactNode;
    slot_1_25928?: React.ReactNode;
}
const DarkModenothemebluetypeprimarystatehoversizebig = (
    props: DarkModenothemebluetypeprimarystatehoversizebigProps
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
        slot_1_25925,
        slot_1_25926,
        slot_1_25927,
        slot_1_25928
    } = props;

    return (
        <div
            className={["component-1_25924", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_25924"
                className="Pixso-symbol-1_25924 fill-lightblue_primaryhover-1_10447 pixso-relative-flex"
            >
                {slot_1_25925 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_25925"
                            className="Pixso-instance-1_25925 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_25926 ??
                    (visible_4958_252 && (
                        <p
                            id="1_25926"
                            className="Pixso-paragraph-1_25926 fill-dark_contentprimary-1_10529-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_25927 ??
                    (visible_4958_42 && (
                        <Darkmodenothemebluetypeonaccentsizebig
                            id="1_25927"
                            className="Pixso-instance-1_25927 pixso-relative-no-shrink"
                        ></Darkmodenothemebluetypeonaccentsizebig>
                    ))}
                {slot_1_25928 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_25928"
                            className="Pixso-instance-1_25928 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypeprimarystatehoversizebig;
