import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemepurpletypeonaccentsizesmall from "@/components/Darkmodenothemepurpletypeonaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemepurpletypeprimarystatedefaultsizesmall.css";
interface DarkModenothemepurpletypeprimarystatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26430?: React.ReactNode;
    slot_1_26431?: React.ReactNode;
    slot_1_26432?: React.ReactNode;
    slot_1_26433?: React.ReactNode;
}
const DarkModenothemepurpletypeprimarystatedefaultsizesmall = (
    props: DarkModenothemepurpletypeprimarystatedefaultsizesmallProps
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
        slot_1_26430,
        slot_1_26431,
        slot_1_26432,
        slot_1_26433
    } = props;

    return (
        <div
            className={["component-1_26429", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26429"
                className="Pixso-symbol-1_26429 fill-purpleprimary-1_30121 pixso-relative-flex"
            >
                {slot_1_26430 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26430"
                            className="Pixso-instance-1_26430 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26431 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26431"
                            className="Pixso-paragraph-1_26431 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26432 ??
                    (visible_4958_42 && (
                        <Darkmodenothemepurpletypeonaccentsizesmall
                            id="1_26432"
                            className="Pixso-instance-1_26432 pixso-relative-no-shrink"
                        ></Darkmodenothemepurpletypeonaccentsizesmall>
                    ))}
                {slot_1_26433 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26433"
                            className="Pixso-instance-1_26433 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypeprimarystatedefaultsizesmall;
