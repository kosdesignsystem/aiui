import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemebluetypedefaultsizebig from "@/components/Darkmodenothemebluetypedefaultsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemebluetypedefaultstatedefaultsizebig.css";
interface DarkModenothemebluetypedefaultstatedefaultsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26190?: React.ReactNode;
    slot_1_26191?: React.ReactNode;
    slot_1_26192?: React.ReactNode;
    slot_1_26193?: React.ReactNode;
}
const DarkModenothemebluetypedefaultstatedefaultsizebig = (
    props: DarkModenothemebluetypedefaultstatedefaultsizebigProps
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
        slot_1_26190,
        slot_1_26191,
        slot_1_26192,
        slot_1_26193
    } = props;

    return (
        <div
            className={["component-1_26189", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26189"
                className="Pixso-symbol-1_26189 pixso-relative-flex"
            >
                {slot_1_26190 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26190"
                            className="Pixso-instance-1_26190 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26191 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26191"
                            className="Pixso-paragraph-1_26191 fill-light_contentprimary-1_10528-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26192 ??
                    (visible_4958_42 && (
                        <Darkmodenothemebluetypedefaultsizebig
                            id="1_26192"
                            className="Pixso-instance-1_26192 pixso-relative-no-shrink"
                        ></Darkmodenothemebluetypedefaultsizebig>
                    ))}
                {slot_1_26193 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26193"
                            className="Pixso-instance-1_26193 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypedefaultstatedefaultsizebig;
