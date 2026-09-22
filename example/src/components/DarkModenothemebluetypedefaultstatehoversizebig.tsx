import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemebluetypedefaultsizebig from "@/components/Darkmodenothemebluetypedefaultsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemebluetypedefaultstatehoversizebig.css";
interface DarkModenothemebluetypedefaultstatehoversizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26195?: React.ReactNode;
    slot_1_26196?: React.ReactNode;
    slot_1_26197?: React.ReactNode;
    slot_1_26198?: React.ReactNode;
}
const DarkModenothemebluetypedefaultstatehoversizebig = (
    props: DarkModenothemebluetypedefaultstatehoversizebigProps
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
        slot_1_26195,
        slot_1_26196,
        slot_1_26197,
        slot_1_26198
    } = props;

    return (
        <div
            className={["component-1_26194", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26194"
                className="Pixso-symbol-1_26194 fill-light-default_secondary-hover-1_10482 pixso-relative-flex"
            >
                {slot_1_26195 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26195"
                            className="Pixso-instance-1_26195 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26196 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26196"
                            className="Pixso-paragraph-1_26196 fill-light_contentprimary-1_10528-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26197 ??
                    (visible_4958_42 && (
                        <Darkmodenothemebluetypedefaultsizebig
                            id="1_26197"
                            className="Pixso-instance-1_26197 pixso-relative-no-shrink"
                        ></Darkmodenothemebluetypedefaultsizebig>
                    ))}
                {slot_1_26198 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26198"
                            className="Pixso-instance-1_26198 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypedefaultstatehoversizebig;
