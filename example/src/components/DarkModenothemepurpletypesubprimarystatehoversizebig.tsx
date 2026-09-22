import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemepurpletypeaccentsizebig from "@/components/Darkmodenothemepurpletypeaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemepurpletypesubprimarystatehoversizebig.css";
interface DarkModenothemepurpletypesubprimarystatehoversizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26075?: React.ReactNode;
    slot_1_26076?: React.ReactNode;
    slot_1_26077?: React.ReactNode;
    slot_1_26078?: React.ReactNode;
}
const DarkModenothemepurpletypesubprimarystatehoversizebig = (
    props: DarkModenothemepurpletypesubprimarystatehoversizebigProps
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
        slot_1_26075,
        slot_1_26076,
        slot_1_26077,
        slot_1_26078
    } = props;

    return (
        <div
            className={["component-1_26074", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26074"
                className="Pixso-symbol-1_26074 fill-light-purple_secondary-hover-1_10471 pixso-relative-flex"
            >
                {slot_1_26075 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26075"
                            className="Pixso-instance-1_26075 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26076 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26076"
                            className="Pixso-paragraph-1_26076 fill-purpleprimary-1_30121-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26077 ??
                    (visible_4958_42 && (
                        <Darkmodenothemepurpletypeaccentsizebig
                            id="1_26077"
                            className="Pixso-instance-1_26077 pixso-relative-no-shrink"
                        ></Darkmodenothemepurpletypeaccentsizebig>
                    ))}
                {slot_1_26078 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26078"
                            className="Pixso-instance-1_26078 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypesubprimarystatehoversizebig;
