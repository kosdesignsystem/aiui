import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemegreentypeonaccentsizesmall from "@/components/Darkmodenothemegreentypeonaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemegreentypeprimarystatedefaultsizesmall.css";
interface DarkModenothemegreentypeprimarystatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26400?: React.ReactNode;
    slot_1_26401?: React.ReactNode;
    slot_1_26402?: React.ReactNode;
    slot_1_26403?: React.ReactNode;
}
const DarkModenothemegreentypeprimarystatedefaultsizesmall = (
    props: DarkModenothemegreentypeprimarystatedefaultsizesmallProps
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
        slot_1_26400,
        slot_1_26401,
        slot_1_26402,
        slot_1_26403
    } = props;

    return (
        <div
            className={["component-1_26399", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26399"
                className="Pixso-symbol-1_26399 fill-greenprimary-1_30120 pixso-relative-flex"
            >
                {slot_1_26400 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26400"
                            className="Pixso-instance-1_26400 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26401 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26401"
                            className="Pixso-paragraph-1_26401 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26402 ??
                    (visible_4958_42 && (
                        <Darkmodenothemegreentypeonaccentsizesmall
                            id="1_26402"
                            className="Pixso-instance-1_26402 pixso-relative-no-shrink"
                        ></Darkmodenothemegreentypeonaccentsizesmall>
                    ))}
                {slot_1_26403 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26403"
                            className="Pixso-instance-1_26403 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypeprimarystatedefaultsizesmall;
