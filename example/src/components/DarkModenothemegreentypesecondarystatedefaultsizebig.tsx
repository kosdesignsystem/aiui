import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemegreentypeaccentsizebig from "@/components/Darkmodenothemegreentypeaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemegreentypesecondarystatedefaultsizebig.css";
interface DarkModenothemegreentypesecondarystatedefaultsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26130?: React.ReactNode;
    slot_1_26131?: React.ReactNode;
    slot_1_26132?: React.ReactNode;
    slot_1_26133?: React.ReactNode;
}
const DarkModenothemegreentypesecondarystatedefaultsizebig = (
    props: DarkModenothemegreentypesecondarystatedefaultsizebigProps
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
        slot_1_26130,
        slot_1_26131,
        slot_1_26132,
        slot_1_26133
    } = props;

    return (
        <div
            className={["component-1_26129", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26129"
                className="Pixso-symbol-1_26129 fill-light_contentplashka-1_30125 pixso-relative-flex"
            >
                {slot_1_26130 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26130"
                            className="Pixso-instance-1_26130 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26131 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26131"
                            className="Pixso-paragraph-1_26131 fill-light_contentprimary-1_10528-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26132 ??
                    (visible_4958_42 && (
                        <Darkmodenothemegreentypeaccentsizebig
                            id="1_26132"
                            className="Pixso-instance-1_26132 pixso-relative-no-shrink"
                        ></Darkmodenothemegreentypeaccentsizebig>
                    ))}
                {slot_1_26133 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26133"
                            className="Pixso-instance-1_26133 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypesecondarystatedefaultsizebig;
