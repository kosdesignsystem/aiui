import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemebluetypeonaccentsizebig from "@/components/Darkmodeyesthemebluetypeonaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemebluetypeprimarystatehoversizebig.css";
interface DarkModeyesthemebluetypeprimarystatehoversizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_25940?: React.ReactNode;
    slot_1_25941?: React.ReactNode;
    slot_1_25942?: React.ReactNode;
    slot_1_25943?: React.ReactNode;
}
const DarkModeyesthemebluetypeprimarystatehoversizebig = (
    props: DarkModeyesthemebluetypeprimarystatehoversizebigProps
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
        slot_1_25940,
        slot_1_25941,
        slot_1_25942,
        slot_1_25943
    } = props;

    return (
        <div
            className={["component-1_25939", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_25939"
                className="Pixso-symbol-1_25939 fill-dark-blue_primary-hover-1_10448 pixso-relative-flex"
            >
                {slot_1_25940 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_25940"
                            className="Pixso-instance-1_25940 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_25941 ??
                    (visible_4958_252 && (
                        <p
                            id="1_25941"
                            className="Pixso-paragraph-1_25941 fill-dark_contentprimary-1_10529-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_25942 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemebluetypeonaccentsizebig
                            id="1_25942"
                            className="Pixso-instance-1_25942 pixso-relative-no-shrink"
                        ></Darkmodeyesthemebluetypeonaccentsizebig>
                    ))}
                {slot_1_25943 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_25943"
                            className="Pixso-instance-1_25943 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypeprimarystatehoversizebig;
