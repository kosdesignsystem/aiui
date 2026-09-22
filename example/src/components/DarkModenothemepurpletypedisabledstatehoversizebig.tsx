import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemepurpletypedisablesizebig from "@/components/Darkmodenothemepurpletypedisablesizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemepurpletypedisabledstatehoversizebig.css";
interface DarkModenothemepurpletypedisabledstatehoversizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26345?: React.ReactNode;
    slot_1_26346?: React.ReactNode;
    slot_1_26347?: React.ReactNode;
    slot_1_26348?: React.ReactNode;
}
const DarkModenothemepurpletypedisabledstatehoversizebig = (
    props: DarkModenothemepurpletypedisabledstatehoversizebigProps
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
        slot_1_26345,
        slot_1_26346,
        slot_1_26347,
        slot_1_26348
    } = props;

    return (
        <div
            className={["component-1_26344", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26344"
                className="Pixso-symbol-1_26344 fill-light_contentplashka-1_30125 pixso-relative-flex"
            >
                {slot_1_26345 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26345"
                            className="Pixso-instance-1_26345 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26346 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26346"
                            className="Pixso-paragraph-1_26346 fill-light_contentdisabled-1_30128-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26347 ??
                    (visible_4958_42 && (
                        <Darkmodenothemepurpletypedisablesizebig
                            id="1_26347"
                            className="Pixso-instance-1_26347 pixso-relative-no-shrink"
                        ></Darkmodenothemepurpletypedisablesizebig>
                    ))}
                {slot_1_26348 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26348"
                            className="Pixso-instance-1_26348 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypedisabledstatehoversizebig;
