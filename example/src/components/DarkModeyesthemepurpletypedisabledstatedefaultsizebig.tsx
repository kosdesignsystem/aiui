import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemepurpletypedisablesizebig from "@/components/Darkmodeyesthemepurpletypedisablesizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemepurpletypedisabledstatedefaultsizebig.css";
interface DarkModeyesthemepurpletypedisabledstatedefaultsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26355?: React.ReactNode;
    slot_1_26356?: React.ReactNode;
    slot_1_26357?: React.ReactNode;
    slot_1_26358?: React.ReactNode;
}
const DarkModeyesthemepurpletypedisabledstatedefaultsizebig = (
    props: DarkModeyesthemepurpletypedisabledstatedefaultsizebigProps
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
        slot_1_26355,
        slot_1_26356,
        slot_1_26357,
        slot_1_26358
    } = props;

    return (
        <div
            className={["component-1_26354", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26354"
                className="Pixso-symbol-1_26354 fill-dark_contentplashka-1_30095 pixso-relative-flex"
            >
                {slot_1_26355 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26355"
                            className="Pixso-instance-1_26355 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26356 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26356"
                            className="Pixso-paragraph-1_26356 fill-dark_contentdisabled-1_30129-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26357 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemepurpletypedisablesizebig
                            id="1_26357"
                            className="Pixso-instance-1_26357 pixso-relative-no-shrink"
                        ></Darkmodeyesthemepurpletypedisablesizebig>
                    ))}
                {slot_1_26358 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26358"
                            className="Pixso-instance-1_26358 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypedisabledstatedefaultsizebig;
