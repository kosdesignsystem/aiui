import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemepurpletypedefaultsizesmall from "@/components/Darkmodeyesthemepurpletypedefaultsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemepurpletypedefaultstatepressedsizesmall.css";
interface DarkModeyesthemepurpletypedefaultstatepressedsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26725?: React.ReactNode;
    slot_1_26726?: React.ReactNode;
    slot_1_26727?: React.ReactNode;
    slot_1_26728?: React.ReactNode;
}
const DarkModeyesthemepurpletypedefaultstatepressedsizesmall = (
    props: DarkModeyesthemepurpletypedefaultstatepressedsizesmallProps
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
        slot_1_26725,
        slot_1_26726,
        slot_1_26727,
        slot_1_26728
    } = props;

    return (
        <div
            className={["component-1_26724", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26724"
                className="Pixso-symbol-1_26724 fill-dark-default_secondary-pressed-1_10485 pixso-relative-flex"
            >
                {slot_1_26725 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26725"
                            className="Pixso-instance-1_26725 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26726 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26726"
                            className="Pixso-paragraph-1_26726 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26727 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemepurpletypedefaultsizesmall
                            id="1_26727"
                            className="Pixso-instance-1_26727 pixso-relative-no-shrink"
                        ></Darkmodeyesthemepurpletypedefaultsizesmall>
                    ))}
                {slot_1_26728 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26728"
                            className="Pixso-instance-1_26728 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypedefaultstatepressedsizesmall;
