import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemepurpletypedefaultsizebig from "@/components/Darkmodenothemepurpletypedefaultsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemepurpletypedefaultstatehoversizebig.css";
interface DarkModenothemepurpletypedefaultstatehoversizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26255?: React.ReactNode;
    slot_1_26256?: React.ReactNode;
    slot_1_26257?: React.ReactNode;
    slot_1_26258?: React.ReactNode;
}
const DarkModenothemepurpletypedefaultstatehoversizebig = (
    props: DarkModenothemepurpletypedefaultstatehoversizebigProps
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
        slot_1_26255,
        slot_1_26256,
        slot_1_26257,
        slot_1_26258
    } = props;

    return (
        <div
            className={["component-1_26254", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26254"
                className="Pixso-symbol-1_26254 fill-light-default_secondary-hover-1_10482 pixso-relative-flex"
            >
                {slot_1_26255 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26255"
                            className="Pixso-instance-1_26255 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26256 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26256"
                            className="Pixso-paragraph-1_26256 fill-light_contentprimary-1_10528-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26257 ??
                    (visible_4958_42 && (
                        <Darkmodenothemepurpletypedefaultsizebig
                            id="1_26257"
                            className="Pixso-instance-1_26257 pixso-relative-no-shrink"
                        ></Darkmodenothemepurpletypedefaultsizebig>
                    ))}
                {slot_1_26258 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26258"
                            className="Pixso-instance-1_26258 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypedefaultstatehoversizebig;
