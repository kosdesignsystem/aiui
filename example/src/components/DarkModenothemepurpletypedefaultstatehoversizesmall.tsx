import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemepurpletypedefaultsizesmall from "@/components/Darkmodenothemepurpletypedefaultsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemepurpletypedefaultstatehoversizesmall.css";
interface DarkModenothemepurpletypedefaultstatehoversizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26705?: React.ReactNode;
    slot_1_26706?: React.ReactNode;
    slot_1_26707?: React.ReactNode;
    slot_1_26708?: React.ReactNode;
}
const DarkModenothemepurpletypedefaultstatehoversizesmall = (
    props: DarkModenothemepurpletypedefaultstatehoversizesmallProps
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
        slot_1_26705,
        slot_1_26706,
        slot_1_26707,
        slot_1_26708
    } = props;

    return (
        <div
            className={["component-1_26704", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26704"
                className="Pixso-symbol-1_26704 fill-light-default_secondary-hover-1_10482 pixso-relative-flex"
            >
                {slot_1_26705 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26705"
                            className="Pixso-instance-1_26705 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26706 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26706"
                            className="Pixso-paragraph-1_26706 fill-light_contentprimary-1_10528-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26707 ??
                    (visible_4958_42 && (
                        <Darkmodenothemepurpletypedefaultsizesmall
                            id="1_26707"
                            className="Pixso-instance-1_26707 pixso-relative-no-shrink"
                        ></Darkmodenothemepurpletypedefaultsizesmall>
                    ))}
                {slot_1_26708 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26708"
                            className="Pixso-instance-1_26708 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypedefaultstatehoversizesmall;
