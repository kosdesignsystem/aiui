import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemepurpletypeaccentsizebig from "@/components/Darkmodeyesthemepurpletypeaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemepurpletypesubprimarystatehoversizebig.css";
interface DarkModeyesthemepurpletypesubprimarystatehoversizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26090?: React.ReactNode;
    slot_1_26091?: React.ReactNode;
    slot_1_26092?: React.ReactNode;
    slot_1_26093?: React.ReactNode;
}
const DarkModeyesthemepurpletypesubprimarystatehoversizebig = (
    props: DarkModeyesthemepurpletypesubprimarystatehoversizebigProps
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
        slot_1_26090,
        slot_1_26091,
        slot_1_26092,
        slot_1_26093
    } = props;

    return (
        <div
            className={["component-1_26089", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26089"
                className="Pixso-symbol-1_26089 fill-dark-purple_secondary-hover-1_10472 pixso-relative-flex"
            >
                {slot_1_26090 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26090"
                            className="Pixso-instance-1_26090 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26091 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26091"
                            className="Pixso-paragraph-1_26091 fill-purpleprimary-1_30121-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26092 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemepurpletypeaccentsizebig
                            id="1_26092"
                            className="Pixso-instance-1_26092 pixso-relative-no-shrink"
                        ></Darkmodeyesthemepurpletypeaccentsizebig>
                    ))}
                {slot_1_26093 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26093"
                            className="Pixso-instance-1_26093 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypesubprimarystatehoversizebig;
