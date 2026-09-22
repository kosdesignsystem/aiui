import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemepurpletypeonaccentsizebig from "@/components/Darkmodenothemepurpletypeonaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemepurpletypeprimarystatehoversizebig.css";
interface DarkModenothemepurpletypeprimarystatehoversizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_25985?: React.ReactNode;
    slot_1_25986?: React.ReactNode;
    slot_1_25987?: React.ReactNode;
    slot_1_25988?: React.ReactNode;
}
const DarkModenothemepurpletypeprimarystatehoversizebig = (
    props: DarkModenothemepurpletypeprimarystatehoversizebigProps
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
        slot_1_25985,
        slot_1_25986,
        slot_1_25987,
        slot_1_25988
    } = props;

    return (
        <div
            className={["component-1_25984", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_25984"
                className="Pixso-symbol-1_25984 fill-lightpurple_primaryhover-1_10456 pixso-relative-flex"
            >
                {slot_1_25985 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_25985"
                            className="Pixso-instance-1_25985 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_25986 ??
                    (visible_4958_252 && (
                        <p
                            id="1_25986"
                            className="Pixso-paragraph-1_25986 fill-dark_contentprimary-1_10529-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_25987 ??
                    (visible_4958_42 && (
                        <Darkmodenothemepurpletypeonaccentsizebig
                            id="1_25987"
                            className="Pixso-instance-1_25987 pixso-relative-no-shrink"
                        ></Darkmodenothemepurpletypeonaccentsizebig>
                    ))}
                {slot_1_25988 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_25988"
                            className="Pixso-instance-1_25988 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypeprimarystatehoversizebig;
