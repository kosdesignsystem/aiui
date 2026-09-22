import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemebluetypeaccentsizesmall from "@/components/Darkmodenothemebluetypeaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemebluetypesubprimarystatehoversizesmall.css";
interface DarkModenothemebluetypesubprimarystatehoversizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26465?: React.ReactNode;
    slot_1_26466?: React.ReactNode;
    slot_1_26467?: React.ReactNode;
    slot_1_26468?: React.ReactNode;
}
const DarkModenothemebluetypesubprimarystatehoversizesmall = (
    props: DarkModenothemebluetypesubprimarystatehoversizesmallProps
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
        slot_1_26465,
        slot_1_26466,
        slot_1_26467,
        slot_1_26468
    } = props;

    return (
        <div
            className={["component-1_26464", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26464"
                className="Pixso-symbol-1_26464 fill-light-blue_secondary-hover-1_10461 pixso-relative-flex"
            >
                {slot_1_26465 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26465"
                            className="Pixso-instance-1_26465 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26466 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26466"
                            className="Pixso-paragraph-1_26466 fill-blueprimary-1_10439-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26467 ??
                    (visible_4958_42 && (
                        <Darkmodenothemebluetypeaccentsizesmall
                            id="1_26467"
                            className="Pixso-instance-1_26467 pixso-relative-no-shrink"
                        ></Darkmodenothemebluetypeaccentsizesmall>
                    ))}
                {slot_1_26468 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26468"
                            className="Pixso-instance-1_26468 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypesubprimarystatehoversizesmall;
