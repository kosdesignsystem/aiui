import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemegreentypedisablesizebig from "@/components/Darkmodenothemegreentypedisablesizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemegreentypedisabledstatehoversizebig.css";
interface DarkModenothemegreentypedisabledstatehoversizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26315?: React.ReactNode;
    slot_1_26316?: React.ReactNode;
    slot_1_26317?: React.ReactNode;
    slot_1_26318?: React.ReactNode;
}
const DarkModenothemegreentypedisabledstatehoversizebig = (
    props: DarkModenothemegreentypedisabledstatehoversizebigProps
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
        slot_1_26315,
        slot_1_26316,
        slot_1_26317,
        slot_1_26318
    } = props;

    return (
        <div
            className={["component-1_26314", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26314"
                className="Pixso-symbol-1_26314 fill-light_contentplashka-1_30125 pixso-relative-flex"
            >
                {slot_1_26315 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26315"
                            className="Pixso-instance-1_26315 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26316 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26316"
                            className="Pixso-paragraph-1_26316 fill-light_contentdisabled-1_30128-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26317 ??
                    (visible_4958_42 && (
                        <Darkmodenothemegreentypedisablesizebig
                            id="1_26317"
                            className="Pixso-instance-1_26317 pixso-relative-no-shrink"
                        ></Darkmodenothemegreentypedisablesizebig>
                    ))}
                {slot_1_26318 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26318"
                            className="Pixso-instance-1_26318 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypedisabledstatehoversizebig;
