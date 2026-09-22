import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemepurpletypeonaccentsizebig from "@/components/Darkmodenothemepurpletypeonaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemepurpletypeprimarystatedefaultsizebig.css";
interface DarkModenothemepurpletypeprimarystatedefaultsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_25980?: React.ReactNode;
    slot_1_25981?: React.ReactNode;
    slot_1_25982?: React.ReactNode;
    slot_1_25983?: React.ReactNode;
}
const DarkModenothemepurpletypeprimarystatedefaultsizebig = (
    props: DarkModenothemepurpletypeprimarystatedefaultsizebigProps
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
        slot_1_25980,
        slot_1_25981,
        slot_1_25982,
        slot_1_25983
    } = props;

    return (
        <div
            className={["component-1_25979", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_25979"
                className="Pixso-symbol-1_25979 fill-purpleprimary-1_30121 pixso-relative-flex"
            >
                {slot_1_25980 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_25980"
                            className="Pixso-instance-1_25980 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_25981 ??
                    (visible_4958_252 && (
                        <p
                            id="1_25981"
                            className="Pixso-paragraph-1_25981 fill-dark_contentprimary-1_10529-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_25982 ??
                    (visible_4958_42 && (
                        <Darkmodenothemepurpletypeonaccentsizebig
                            id="1_25982"
                            className="Pixso-instance-1_25982 pixso-relative-no-shrink"
                        ></Darkmodenothemepurpletypeonaccentsizebig>
                    ))}
                {slot_1_25983 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_25983"
                            className="Pixso-instance-1_25983 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypeprimarystatedefaultsizebig;
