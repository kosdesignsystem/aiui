import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemebluetypeaccentsizebig from "@/components/Darkmodeyesthemebluetypeaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemebluetypesecondarystatepressedsizebig.css";
interface DarkModeyesthemebluetypesecondarystatepressedsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26125?: React.ReactNode;
    slot_1_26126?: React.ReactNode;
    slot_1_26127?: React.ReactNode;
    slot_1_26128?: React.ReactNode;
}
const DarkModeyesthemebluetypesecondarystatepressedsizebig = (
    props: DarkModeyesthemebluetypesecondarystatepressedsizebigProps
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
        slot_1_26125,
        slot_1_26126,
        slot_1_26127,
        slot_1_26128
    } = props;

    return (
        <div
            className={["component-1_26124", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26124"
                className="Pixso-symbol-1_26124 fill-dark-default_primary-pressed-1_10481 pixso-relative-flex"
            >
                {slot_1_26125 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26125"
                            className="Pixso-instance-1_26125 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26126 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26126"
                            className="Pixso-paragraph-1_26126 fill-dark_contentprimary-1_10529-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26127 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemebluetypeaccentsizebig
                            id="1_26127"
                            className="Pixso-instance-1_26127 pixso-relative-no-shrink"
                        ></Darkmodeyesthemebluetypeaccentsizebig>
                    ))}
                {slot_1_26128 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26128"
                            className="Pixso-instance-1_26128 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypesecondarystatepressedsizebig;
