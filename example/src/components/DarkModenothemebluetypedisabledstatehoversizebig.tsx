import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemebluetypedisablesizebig from "@/components/Darkmodenothemebluetypedisablesizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemebluetypedisabledstatehoversizebig.css";
interface DarkModenothemebluetypedisabledstatehoversizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26285?: React.ReactNode;
    slot_1_26286?: React.ReactNode;
    slot_1_26287?: React.ReactNode;
    slot_1_26288?: React.ReactNode;
}
const DarkModenothemebluetypedisabledstatehoversizebig = (
    props: DarkModenothemebluetypedisabledstatehoversizebigProps
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
        slot_1_26285,
        slot_1_26286,
        slot_1_26287,
        slot_1_26288
    } = props;

    return (
        <div
            className={["component-1_26284", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26284"
                className="Pixso-symbol-1_26284 fill-light_contentplashka-1_30125 pixso-relative-flex"
            >
                {slot_1_26285 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26285"
                            className="Pixso-instance-1_26285 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26286 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26286"
                            className="Pixso-paragraph-1_26286 fill-light_contentdisabled-1_30128-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26287 ??
                    (visible_4958_42 && (
                        <Darkmodenothemebluetypedisablesizebig
                            id="1_26287"
                            className="Pixso-instance-1_26287 pixso-relative-no-shrink"
                        ></Darkmodenothemebluetypedisablesizebig>
                    ))}
                {slot_1_26288 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26288"
                            className="Pixso-instance-1_26288 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypedisabledstatehoversizebig;
