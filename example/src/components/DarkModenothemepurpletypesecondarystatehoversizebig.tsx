import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemepurpletypeaccentsizebig from "@/components/Darkmodenothemepurpletypeaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemepurpletypesecondarystatehoversizebig.css";
interface DarkModenothemepurpletypesecondarystatehoversizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26165?: React.ReactNode;
    slot_1_26166?: React.ReactNode;
    slot_1_26167?: React.ReactNode;
    slot_1_26168?: React.ReactNode;
}
const DarkModenothemepurpletypesecondarystatehoversizebig = (
    props: DarkModenothemepurpletypesecondarystatehoversizebigProps
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
        slot_1_26165,
        slot_1_26166,
        slot_1_26167,
        slot_1_26168
    } = props;

    return (
        <div
            className={["component-1_26164", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26164"
                className="Pixso-symbol-1_26164 fill-light-default_primary-hover-1_10478 pixso-relative-flex"
            >
                {slot_1_26165 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26165"
                            className="Pixso-instance-1_26165 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26166 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26166"
                            className="Pixso-paragraph-1_26166 fill-light_contentprimary-1_10528-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26167 ??
                    (visible_4958_42 && (
                        <Darkmodenothemepurpletypeaccentsizebig
                            id="1_26167"
                            className="Pixso-instance-1_26167 pixso-relative-no-shrink"
                        ></Darkmodenothemepurpletypeaccentsizebig>
                    ))}
                {slot_1_26168 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26168"
                            className="Pixso-instance-1_26168 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypesecondarystatehoversizebig;
