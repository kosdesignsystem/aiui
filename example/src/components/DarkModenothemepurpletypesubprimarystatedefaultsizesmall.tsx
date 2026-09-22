import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemepurpletypeaccentsizesmall from "@/components/Darkmodenothemepurpletypeaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemepurpletypesubprimarystatedefaultsizesmall.css";
interface DarkModenothemepurpletypesubprimarystatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26520?: React.ReactNode;
    slot_1_26521?: React.ReactNode;
    slot_1_26522?: React.ReactNode;
    slot_1_26523?: React.ReactNode;
}
const DarkModenothemepurpletypesubprimarystatedefaultsizesmall = (
    props: DarkModenothemepurpletypesubprimarystatedefaultsizesmallProps
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
        slot_1_26520,
        slot_1_26521,
        slot_1_26522,
        slot_1_26523
    } = props;

    return (
        <div
            className={["component-1_26519", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26519"
                className="Pixso-symbol-1_26519 fill-purpleplashka-1_30124 pixso-relative-flex"
            >
                {slot_1_26520 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26520"
                            className="Pixso-instance-1_26520 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26521 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26521"
                            className="Pixso-paragraph-1_26521 fill-purpleprimary-1_30121-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26522 ??
                    (visible_4958_42 && (
                        <Darkmodenothemepurpletypeaccentsizesmall
                            id="1_26522"
                            className="Pixso-instance-1_26522 pixso-relative-no-shrink"
                        ></Darkmodenothemepurpletypeaccentsizesmall>
                    ))}
                {slot_1_26523 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26523"
                            className="Pixso-instance-1_26523 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypesubprimarystatedefaultsizesmall;
