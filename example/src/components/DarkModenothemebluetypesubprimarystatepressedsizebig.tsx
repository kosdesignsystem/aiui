import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemebluetypeaccentsizebig from "@/components/Darkmodenothemebluetypeaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemebluetypesubprimarystatepressedsizebig.css";
interface DarkModenothemebluetypesubprimarystatepressedsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26020?: React.ReactNode;
    slot_1_26021?: React.ReactNode;
    slot_1_26022?: React.ReactNode;
    slot_1_26023?: React.ReactNode;
}
const DarkModenothemebluetypesubprimarystatepressedsizebig = (
    props: DarkModenothemebluetypesubprimarystatepressedsizebigProps
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
        slot_1_26020,
        slot_1_26021,
        slot_1_26022,
        slot_1_26023
    } = props;

    return (
        <div
            className={["component-1_26019", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26019"
                className="Pixso-symbol-1_26019 fill-light-blue_secondary-pressed-1_10463 pixso-relative-flex"
            >
                {slot_1_26020 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26020"
                            className="Pixso-instance-1_26020 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26021 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26021"
                            className="Pixso-paragraph-1_26021 fill-blueprimary-1_10439-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26022 ??
                    (visible_4958_42 && (
                        <Darkmodenothemebluetypeaccentsizebig
                            id="1_26022"
                            className="Pixso-instance-1_26022 pixso-relative-no-shrink"
                        ></Darkmodenothemebluetypeaccentsizebig>
                    ))}
                {slot_1_26023 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26023"
                            className="Pixso-instance-1_26023 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypesubprimarystatepressedsizebig;
