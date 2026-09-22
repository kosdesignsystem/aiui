import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemebluetypeaccentsizebig from "@/components/Darkmodenothemebluetypeaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemebluetypesecondarystatedefaultsizebig.css";
interface DarkModenothemebluetypesecondarystatedefaultsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26100?: React.ReactNode;
    slot_1_26101?: React.ReactNode;
    slot_1_26102?: React.ReactNode;
    slot_1_26103?: React.ReactNode;
}
const DarkModenothemebluetypesecondarystatedefaultsizebig = (
    props: DarkModenothemebluetypesecondarystatedefaultsizebigProps
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
        slot_1_26100,
        slot_1_26101,
        slot_1_26102,
        slot_1_26103
    } = props;

    return (
        <div
            className={["component-1_26099", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26099"
                className="Pixso-symbol-1_26099 fill-light_contentplashka-1_30125 pixso-relative-flex"
            >
                {slot_1_26100 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26100"
                            className="Pixso-instance-1_26100 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26101 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26101"
                            className="Pixso-paragraph-1_26101 fill-light_contentprimary-1_10528-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26102 ??
                    (visible_4958_42 && (
                        <Darkmodenothemebluetypeaccentsizebig
                            id="1_26102"
                            className="Pixso-instance-1_26102 pixso-relative-no-shrink"
                        ></Darkmodenothemebluetypeaccentsizebig>
                    ))}
                {slot_1_26103 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26103"
                            className="Pixso-instance-1_26103 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypesecondarystatedefaultsizebig;
