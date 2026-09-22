import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemebluetypeonaccentsizebig from "@/components/Darkmodenothemebluetypeonaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemebluetypeprimarystatepressedsizebig.css";
interface DarkModenothemebluetypeprimarystatepressedsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_25930?: React.ReactNode;
    slot_1_25931?: React.ReactNode;
    slot_1_25932?: React.ReactNode;
    slot_1_25933?: React.ReactNode;
}
const DarkModenothemebluetypeprimarystatepressedsizebig = (
    props: DarkModenothemebluetypeprimarystatepressedsizebigProps
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
        slot_1_25930,
        slot_1_25931,
        slot_1_25932,
        slot_1_25933
    } = props;

    return (
        <div
            className={["component-1_25929", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_25929"
                className="Pixso-symbol-1_25929 fill-lightblue_primarypressed-1_10449 pixso-relative-flex"
            >
                {slot_1_25930 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_25930"
                            className="Pixso-instance-1_25930 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_25931 ??
                    (visible_4958_252 && (
                        <p
                            id="1_25931"
                            className="Pixso-paragraph-1_25931 fill-dark_contentprimary-1_10529-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_25932 ??
                    (visible_4958_42 && (
                        <Darkmodenothemebluetypeonaccentsizebig
                            id="1_25932"
                            className="Pixso-instance-1_25932 pixso-relative-no-shrink"
                        ></Darkmodenothemebluetypeonaccentsizebig>
                    ))}
                {slot_1_25933 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_25933"
                            className="Pixso-instance-1_25933 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypeprimarystatepressedsizebig;
