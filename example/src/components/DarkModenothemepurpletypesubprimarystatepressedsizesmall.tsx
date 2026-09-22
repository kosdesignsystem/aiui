import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemepurpletypeaccentsizesmall from "@/components/Darkmodenothemepurpletypeaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemepurpletypesubprimarystatepressedsizesmall.css";
interface DarkModenothemepurpletypesubprimarystatepressedsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26530?: React.ReactNode;
    slot_1_26531?: React.ReactNode;
    slot_1_26532?: React.ReactNode;
    slot_1_26533?: React.ReactNode;
}
const DarkModenothemepurpletypesubprimarystatepressedsizesmall = (
    props: DarkModenothemepurpletypesubprimarystatepressedsizesmallProps
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
        slot_1_26530,
        slot_1_26531,
        slot_1_26532,
        slot_1_26533
    } = props;

    return (
        <div
            className={["component-1_26529", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26529"
                className="Pixso-symbol-1_26529 fill-light-purple_secondary-pressed-1_10473 pixso-relative-flex"
            >
                {slot_1_26530 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26530"
                            className="Pixso-instance-1_26530 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26531 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26531"
                            className="Pixso-paragraph-1_26531 fill-purpleprimary-1_30121-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26532 ??
                    (visible_4958_42 && (
                        <Darkmodenothemepurpletypeaccentsizesmall
                            id="1_26532"
                            className="Pixso-instance-1_26532 pixso-relative-no-shrink"
                        ></Darkmodenothemepurpletypeaccentsizesmall>
                    ))}
                {slot_1_26533 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26533"
                            className="Pixso-instance-1_26533 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypesubprimarystatepressedsizesmall;
