import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemepurpletypedefaultsizesmall from "@/components/Darkmodenothemepurpletypedefaultsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemepurpletypedefaultstatedefaultsizesmall.css";
interface DarkModenothemepurpletypedefaultstatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26700?: React.ReactNode;
    slot_1_26701?: React.ReactNode;
    slot_1_26702?: React.ReactNode;
    slot_1_26703?: React.ReactNode;
}
const DarkModenothemepurpletypedefaultstatedefaultsizesmall = (
    props: DarkModenothemepurpletypedefaultstatedefaultsizesmallProps
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
        slot_1_26700,
        slot_1_26701,
        slot_1_26702,
        slot_1_26703
    } = props;

    return (
        <div
            className={["component-1_26699", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26699"
                className="Pixso-symbol-1_26699 pixso-relative-flex"
            >
                {slot_1_26700 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26700"
                            className="Pixso-instance-1_26700 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26701 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26701"
                            className="Pixso-paragraph-1_26701 fill-light_contentprimary-1_10528-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26702 ??
                    (visible_4958_42 && (
                        <Darkmodenothemepurpletypedefaultsizesmall
                            id="1_26702"
                            className="Pixso-instance-1_26702 pixso-relative-no-shrink"
                        ></Darkmodenothemepurpletypedefaultsizesmall>
                    ))}
                {slot_1_26703 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26703"
                            className="Pixso-instance-1_26703 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypedefaultstatedefaultsizesmall;
