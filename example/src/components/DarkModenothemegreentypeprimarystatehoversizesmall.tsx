import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemegreentypeonaccentsizesmall from "@/components/Darkmodenothemegreentypeonaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemegreentypeprimarystatehoversizesmall.css";
interface DarkModenothemegreentypeprimarystatehoversizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26405?: React.ReactNode;
    slot_1_26406?: React.ReactNode;
    slot_1_26407?: React.ReactNode;
    slot_1_26408?: React.ReactNode;
}
const DarkModenothemegreentypeprimarystatehoversizesmall = (
    props: DarkModenothemegreentypeprimarystatehoversizesmallProps
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
        slot_1_26405,
        slot_1_26406,
        slot_1_26407,
        slot_1_26408
    } = props;

    return (
        <div
            className={["component-1_26404", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26404"
                className="Pixso-symbol-1_26404 fill-light-green_primary-hover-1_10452 pixso-relative-flex"
            >
                {slot_1_26405 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26405"
                            className="Pixso-instance-1_26405 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26406 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26406"
                            className="Pixso-paragraph-1_26406 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26407 ??
                    (visible_4958_42 && (
                        <Darkmodenothemegreentypeonaccentsizesmall
                            id="1_26407"
                            className="Pixso-instance-1_26407 pixso-relative-no-shrink"
                        ></Darkmodenothemegreentypeonaccentsizesmall>
                    ))}
                {slot_1_26408 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26408"
                            className="Pixso-instance-1_26408 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypeprimarystatehoversizesmall;
