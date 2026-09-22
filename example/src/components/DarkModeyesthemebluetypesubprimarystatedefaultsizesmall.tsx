import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemebluetypeaccentsizesmall from "@/components/Darkmodeyesthemebluetypeaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemebluetypesubprimarystatedefaultsizesmall.css";
interface DarkModeyesthemebluetypesubprimarystatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26475?: React.ReactNode;
    slot_1_26476?: React.ReactNode;
    slot_1_26477?: React.ReactNode;
    slot_1_26478?: React.ReactNode;
}
const DarkModeyesthemebluetypesubprimarystatedefaultsizesmall = (
    props: DarkModeyesthemebluetypesubprimarystatedefaultsizesmallProps
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
        slot_1_26475,
        slot_1_26476,
        slot_1_26477,
        slot_1_26478
    } = props;

    return (
        <div
            className={["component-1_26474", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26474"
                className="Pixso-symbol-1_26474 fill-blueplashka-1_30122 pixso-relative-flex"
            >
                {slot_1_26475 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26475"
                            className="Pixso-instance-1_26475 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26476 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26476"
                            className="Pixso-paragraph-1_26476 fill-blueprimary-1_10439-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26477 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemebluetypeaccentsizesmall
                            id="1_26477"
                            className="Pixso-instance-1_26477 pixso-relative-no-shrink"
                        ></Darkmodeyesthemebluetypeaccentsizesmall>
                    ))}
                {slot_1_26478 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26478"
                            className="Pixso-instance-1_26478 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypesubprimarystatedefaultsizesmall;
