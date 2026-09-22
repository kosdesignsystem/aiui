import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemepurpletypeaccentsizesmall from "@/components/Darkmodenothemepurpletypeaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemepurpletypesecondarystatedefaultsizesmall.css";
interface DarkModenothemepurpletypesecondarystatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26610?: React.ReactNode;
    slot_1_26611?: React.ReactNode;
    slot_1_26612?: React.ReactNode;
    slot_1_26613?: React.ReactNode;
}
const DarkModenothemepurpletypesecondarystatedefaultsizesmall = (
    props: DarkModenothemepurpletypesecondarystatedefaultsizesmallProps
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
        slot_1_26610,
        slot_1_26611,
        slot_1_26612,
        slot_1_26613
    } = props;

    return (
        <div
            className={["component-1_26609", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26609"
                className="Pixso-symbol-1_26609 fill-light_contentplashka-1_30125 pixso-relative-flex"
            >
                {slot_1_26610 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26610"
                            className="Pixso-instance-1_26610 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26611 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26611"
                            className="Pixso-paragraph-1_26611 fill-light_contentprimary-1_10528-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26612 ??
                    (visible_4958_42 && (
                        <Darkmodenothemepurpletypeaccentsizesmall
                            id="1_26612"
                            className="Pixso-instance-1_26612 pixso-relative-no-shrink"
                        ></Darkmodenothemepurpletypeaccentsizesmall>
                    ))}
                {slot_1_26613 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26613"
                            className="Pixso-instance-1_26613 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypesecondarystatedefaultsizesmall;
