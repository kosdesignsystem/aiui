import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemepurpletypeaccentsizesmall from "@/components/Darkmodeyesthemepurpletypeaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemepurpletypesubprimarystatehoversizesmall.css";
interface DarkModeyesthemepurpletypesubprimarystatehoversizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26540?: React.ReactNode;
    slot_1_26541?: React.ReactNode;
    slot_1_26542?: React.ReactNode;
    slot_1_26543?: React.ReactNode;
}
const DarkModeyesthemepurpletypesubprimarystatehoversizesmall = (
    props: DarkModeyesthemepurpletypesubprimarystatehoversizesmallProps
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
        slot_1_26540,
        slot_1_26541,
        slot_1_26542,
        slot_1_26543
    } = props;

    return (
        <div
            className={["component-1_26539", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26539"
                className="Pixso-symbol-1_26539 fill-dark-purple_secondary-hover-1_10472 pixso-relative-flex"
            >
                {slot_1_26540 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26540"
                            className="Pixso-instance-1_26540 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26541 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26541"
                            className="Pixso-paragraph-1_26541 fill-purpleprimary-1_30121-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26542 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemepurpletypeaccentsizesmall
                            id="1_26542"
                            className="Pixso-instance-1_26542 pixso-relative-no-shrink"
                        ></Darkmodeyesthemepurpletypeaccentsizesmall>
                    ))}
                {slot_1_26543 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26543"
                            className="Pixso-instance-1_26543 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypesubprimarystatehoversizesmall;
