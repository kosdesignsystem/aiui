import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemepurpletypedefaultsizebig from "@/components/Darkmodeyesthemepurpletypedefaultsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemepurpletypedefaultstatepressedsizebig.css";
interface DarkModeyesthemepurpletypedefaultstatepressedsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26275?: React.ReactNode;
    slot_1_26276?: React.ReactNode;
    slot_1_26277?: React.ReactNode;
    slot_1_26278?: React.ReactNode;
}
const DarkModeyesthemepurpletypedefaultstatepressedsizebig = (
    props: DarkModeyesthemepurpletypedefaultstatepressedsizebigProps
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
        slot_1_26275,
        slot_1_26276,
        slot_1_26277,
        slot_1_26278
    } = props;

    return (
        <div
            className={["component-1_26274", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26274"
                className="Pixso-symbol-1_26274 fill-dark-default_secondary-pressed-1_10485 pixso-relative-flex"
            >
                {slot_1_26275 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26275"
                            className="Pixso-instance-1_26275 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26276 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26276"
                            className="Pixso-paragraph-1_26276 fill-dark_contentprimary-1_10529-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26277 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemepurpletypedefaultsizebig
                            id="1_26277"
                            className="Pixso-instance-1_26277 pixso-relative-no-shrink"
                        ></Darkmodeyesthemepurpletypedefaultsizebig>
                    ))}
                {slot_1_26278 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26278"
                            className="Pixso-instance-1_26278 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypedefaultstatepressedsizebig;
