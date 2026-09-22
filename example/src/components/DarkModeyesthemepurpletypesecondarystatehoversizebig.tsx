import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemepurpletypeaccentsizebig from "@/components/Darkmodeyesthemepurpletypeaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemepurpletypesecondarystatehoversizebig.css";
interface DarkModeyesthemepurpletypesecondarystatehoversizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26180?: React.ReactNode;
    slot_1_26181?: React.ReactNode;
    slot_1_26182?: React.ReactNode;
    slot_1_26183?: React.ReactNode;
}
const DarkModeyesthemepurpletypesecondarystatehoversizebig = (
    props: DarkModeyesthemepurpletypesecondarystatehoversizebigProps
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
        slot_1_26180,
        slot_1_26181,
        slot_1_26182,
        slot_1_26183
    } = props;

    return (
        <div
            className={["component-1_26179", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26179"
                className="Pixso-symbol-1_26179 fill-dark-default_primary-hover-1_10479 pixso-relative-flex"
            >
                {slot_1_26180 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26180"
                            className="Pixso-instance-1_26180 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26181 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26181"
                            className="Pixso-paragraph-1_26181 fill-dark_contentprimary-1_10529-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26182 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemepurpletypeaccentsizebig
                            id="1_26182"
                            className="Pixso-instance-1_26182 pixso-relative-no-shrink"
                        ></Darkmodeyesthemepurpletypeaccentsizebig>
                    ))}
                {slot_1_26183 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26183"
                            className="Pixso-instance-1_26183 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypesecondarystatehoversizebig;
