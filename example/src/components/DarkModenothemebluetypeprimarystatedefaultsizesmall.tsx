import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemebluetypeonaccentsizesmall from "@/components/Darkmodenothemebluetypeonaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemebluetypeprimarystatedefaultsizesmall.css";
interface DarkModenothemebluetypeprimarystatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26370?: React.ReactNode;
    slot_1_26371?: React.ReactNode;
    slot_1_26372?: React.ReactNode;
    slot_1_26373?: React.ReactNode;
}
const DarkModenothemebluetypeprimarystatedefaultsizesmall = (
    props: DarkModenothemebluetypeprimarystatedefaultsizesmallProps
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
        slot_1_26370,
        slot_1_26371,
        slot_1_26372,
        slot_1_26373
    } = props;

    return (
        <div
            className={["component-1_26369", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26369"
                className="Pixso-symbol-1_26369 fill-blueprimary-1_10439 pixso-relative-flex"
            >
                {slot_1_26370 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26370"
                            className="Pixso-instance-1_26370 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26371 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26371"
                            className="Pixso-paragraph-1_26371 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26372 ??
                    (visible_4958_42 && (
                        <Darkmodenothemebluetypeonaccentsizesmall
                            id="1_26372"
                            className="Pixso-instance-1_26372 pixso-relative-no-shrink"
                        ></Darkmodenothemebluetypeonaccentsizesmall>
                    ))}
                {slot_1_26373 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26373"
                            className="Pixso-instance-1_26373 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypeprimarystatedefaultsizesmall;
