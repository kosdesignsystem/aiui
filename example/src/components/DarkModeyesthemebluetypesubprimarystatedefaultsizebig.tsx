import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemebluetypeaccentsizebig from "@/components/Darkmodeyesthemebluetypeaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemebluetypesubprimarystatedefaultsizebig.css";
interface DarkModeyesthemebluetypesubprimarystatedefaultsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26025?: React.ReactNode;
    slot_1_26026?: React.ReactNode;
    slot_1_26027?: React.ReactNode;
    slot_1_26028?: React.ReactNode;
}
const DarkModeyesthemebluetypesubprimarystatedefaultsizebig = (
    props: DarkModeyesthemebluetypesubprimarystatedefaultsizebigProps
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
        slot_1_26025,
        slot_1_26026,
        slot_1_26027,
        slot_1_26028
    } = props;

    return (
        <div
            className={["component-1_26024", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26024"
                className="Pixso-symbol-1_26024 fill-blueplashka-1_30122 pixso-relative-flex"
            >
                {slot_1_26025 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26025"
                            className="Pixso-instance-1_26025 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26026 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26026"
                            className="Pixso-paragraph-1_26026 fill-blueprimary-1_10439-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26027 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemebluetypeaccentsizebig
                            id="1_26027"
                            className="Pixso-instance-1_26027 pixso-relative-no-shrink"
                        ></Darkmodeyesthemebluetypeaccentsizebig>
                    ))}
                {slot_1_26028 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26028"
                            className="Pixso-instance-1_26028 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypesubprimarystatedefaultsizebig;
