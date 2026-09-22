import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemepurpletypedisablesizebig from "@/components/Darkmodenothemepurpletypedisablesizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemepurpletypedisabledstatepressedsizebig.css";
interface DarkModenothemepurpletypedisabledstatepressedsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26350?: React.ReactNode;
    slot_1_26351?: React.ReactNode;
    slot_1_26352?: React.ReactNode;
    slot_1_26353?: React.ReactNode;
}
const DarkModenothemepurpletypedisabledstatepressedsizebig = (
    props: DarkModenothemepurpletypedisabledstatepressedsizebigProps
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
        slot_1_26350,
        slot_1_26351,
        slot_1_26352,
        slot_1_26353
    } = props;

    return (
        <div
            className={["component-1_26349", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26349"
                className="Pixso-symbol-1_26349 fill-light_contentplashka-1_30125 pixso-relative-flex"
            >
                {slot_1_26350 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26350"
                            className="Pixso-instance-1_26350 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26351 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26351"
                            className="Pixso-paragraph-1_26351 fill-light_contentdisabled-1_30128-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26352 ??
                    (visible_4958_42 && (
                        <Darkmodenothemepurpletypedisablesizebig
                            id="1_26352"
                            className="Pixso-instance-1_26352 pixso-relative-no-shrink"
                        ></Darkmodenothemepurpletypedisablesizebig>
                    ))}
                {slot_1_26353 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26353"
                            className="Pixso-instance-1_26353 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypedisabledstatepressedsizebig;
