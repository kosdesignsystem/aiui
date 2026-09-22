import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemebluetypeaccentsizebig from "@/components/Darkmodeyesthemebluetypeaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemebluetypesubprimarystatepressedsizebig.css";
interface DarkModeyesthemebluetypesubprimarystatepressedsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26035?: React.ReactNode;
    slot_1_26036?: React.ReactNode;
    slot_1_26037?: React.ReactNode;
    slot_1_26038?: React.ReactNode;
}
const DarkModeyesthemebluetypesubprimarystatepressedsizebig = (
    props: DarkModeyesthemebluetypesubprimarystatepressedsizebigProps
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
        slot_1_26035,
        slot_1_26036,
        slot_1_26037,
        slot_1_26038
    } = props;

    return (
        <div
            className={["component-1_26034", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26034"
                className="Pixso-symbol-1_26034 fill-dark-blue_secondary-pressed-1_10464 pixso-relative-flex"
            >
                {slot_1_26035 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26035"
                            className="Pixso-instance-1_26035 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26036 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26036"
                            className="Pixso-paragraph-1_26036 fill-blueprimary-1_10439-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26037 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemebluetypeaccentsizebig
                            id="1_26037"
                            className="Pixso-instance-1_26037 pixso-relative-no-shrink"
                        ></Darkmodeyesthemebluetypeaccentsizebig>
                    ))}
                {slot_1_26038 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26038"
                            className="Pixso-instance-1_26038 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypesubprimarystatepressedsizebig;
