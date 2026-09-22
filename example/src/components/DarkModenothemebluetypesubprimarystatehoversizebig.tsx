import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemebluetypeaccentsizebig from "@/components/Darkmodenothemebluetypeaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemebluetypesubprimarystatehoversizebig.css";
interface DarkModenothemebluetypesubprimarystatehoversizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26015?: React.ReactNode;
    slot_1_26016?: React.ReactNode;
    slot_1_26017?: React.ReactNode;
    slot_1_26018?: React.ReactNode;
}
const DarkModenothemebluetypesubprimarystatehoversizebig = (
    props: DarkModenothemebluetypesubprimarystatehoversizebigProps
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
        slot_1_26015,
        slot_1_26016,
        slot_1_26017,
        slot_1_26018
    } = props;

    return (
        <div
            className={["component-1_26014", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26014"
                className="Pixso-symbol-1_26014 fill-light-blue_secondary-hover-1_10461 pixso-relative-flex"
            >
                {slot_1_26015 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26015"
                            className="Pixso-instance-1_26015 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26016 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26016"
                            className="Pixso-paragraph-1_26016 fill-blueprimary-1_10439-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26017 ??
                    (visible_4958_42 && (
                        <Darkmodenothemebluetypeaccentsizebig
                            id="1_26017"
                            className="Pixso-instance-1_26017 pixso-relative-no-shrink"
                        ></Darkmodenothemebluetypeaccentsizebig>
                    ))}
                {slot_1_26018 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26018"
                            className="Pixso-instance-1_26018 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypesubprimarystatehoversizebig;
