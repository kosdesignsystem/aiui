import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemepurpletypeonaccentsizesmall from "@/components/Darkmodenothemepurpletypeonaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemepurpletypeprimarystatehoversizesmall.css";
interface DarkModenothemepurpletypeprimarystatehoversizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26435?: React.ReactNode;
    slot_1_26436?: React.ReactNode;
    slot_1_26437?: React.ReactNode;
    slot_1_26438?: React.ReactNode;
}
const DarkModenothemepurpletypeprimarystatehoversizesmall = (
    props: DarkModenothemepurpletypeprimarystatehoversizesmallProps
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
        slot_1_26435,
        slot_1_26436,
        slot_1_26437,
        slot_1_26438
    } = props;

    return (
        <div
            className={["component-1_26434", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26434"
                className="Pixso-symbol-1_26434 fill-lightpurple_primaryhover-1_10456 pixso-relative-flex"
            >
                {slot_1_26435 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26435"
                            className="Pixso-instance-1_26435 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26436 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26436"
                            className="Pixso-paragraph-1_26436 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26437 ??
                    (visible_4958_42 && (
                        <Darkmodenothemepurpletypeonaccentsizesmall
                            id="1_26437"
                            className="Pixso-instance-1_26437 pixso-relative-no-shrink"
                        ></Darkmodenothemepurpletypeonaccentsizesmall>
                    ))}
                {slot_1_26438 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26438"
                            className="Pixso-instance-1_26438 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypeprimarystatehoversizesmall;
