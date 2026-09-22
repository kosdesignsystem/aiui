import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemepurpletypeaccentsizebig from "@/components/Darkmodeyesthemepurpletypeaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemepurpletypesecondarystatepressedsizebig.css";
interface DarkModeyesthemepurpletypesecondarystatepressedsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26185?: React.ReactNode;
    slot_1_26186?: React.ReactNode;
    slot_1_26187?: React.ReactNode;
    slot_1_26188?: React.ReactNode;
}
const DarkModeyesthemepurpletypesecondarystatepressedsizebig = (
    props: DarkModeyesthemepurpletypesecondarystatepressedsizebigProps
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
        slot_1_26185,
        slot_1_26186,
        slot_1_26187,
        slot_1_26188
    } = props;

    return (
        <div
            className={["component-1_26184", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26184"
                className="Pixso-symbol-1_26184 fill-dark-default_primary-pressed-1_10481 pixso-relative-flex"
            >
                {slot_1_26185 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26185"
                            className="Pixso-instance-1_26185 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26186 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26186"
                            className="Pixso-paragraph-1_26186 fill-dark_contentprimary-1_10529-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26187 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemepurpletypeaccentsizebig
                            id="1_26187"
                            className="Pixso-instance-1_26187 pixso-relative-no-shrink"
                        ></Darkmodeyesthemepurpletypeaccentsizebig>
                    ))}
                {slot_1_26188 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26188"
                            className="Pixso-instance-1_26188 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypesecondarystatepressedsizebig;
