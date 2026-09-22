import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemepurpletypeaccentsizesmall from "@/components/Darkmodeyesthemepurpletypeaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemepurpletypesecondarystatehoversizesmall.css";
interface DarkModeyesthemepurpletypesecondarystatehoversizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26630?: React.ReactNode;
    slot_1_26631?: React.ReactNode;
    slot_1_26632?: React.ReactNode;
    slot_1_26633?: React.ReactNode;
}
const DarkModeyesthemepurpletypesecondarystatehoversizesmall = (
    props: DarkModeyesthemepurpletypesecondarystatehoversizesmallProps
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
        slot_1_26630,
        slot_1_26631,
        slot_1_26632,
        slot_1_26633
    } = props;

    return (
        <div
            className={["component-1_26629", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26629"
                className="Pixso-symbol-1_26629 fill-dark-default_primary-hover-1_10479 pixso-relative-flex"
            >
                {slot_1_26630 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26630"
                            className="Pixso-instance-1_26630 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26631 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26631"
                            className="Pixso-paragraph-1_26631 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26632 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemepurpletypeaccentsizesmall
                            id="1_26632"
                            className="Pixso-instance-1_26632 pixso-relative-no-shrink"
                        ></Darkmodeyesthemepurpletypeaccentsizesmall>
                    ))}
                {slot_1_26633 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26633"
                            className="Pixso-instance-1_26633 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypesecondarystatehoversizesmall;
