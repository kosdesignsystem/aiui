import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemegreentypeaccentsizebig from "@/components/Darkmodenothemegreentypeaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemegreentypesecondarystatepressedsizebig.css";
interface DarkModenothemegreentypesecondarystatepressedsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26140?: React.ReactNode;
    slot_1_26141?: React.ReactNode;
    slot_1_26142?: React.ReactNode;
    slot_1_26143?: React.ReactNode;
}
const DarkModenothemegreentypesecondarystatepressedsizebig = (
    props: DarkModenothemegreentypesecondarystatepressedsizebigProps
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
        slot_1_26140,
        slot_1_26141,
        slot_1_26142,
        slot_1_26143
    } = props;

    return (
        <div
            className={["component-1_26139", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26139"
                className="Pixso-symbol-1_26139 fill-light-default_primary-pressed-1_10480 pixso-relative-flex"
            >
                {slot_1_26140 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26140"
                            className="Pixso-instance-1_26140 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26141 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26141"
                            className="Pixso-paragraph-1_26141 fill-light_contentprimary-1_10528-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26142 ??
                    (visible_4958_42 && (
                        <Darkmodenothemegreentypeaccentsizebig
                            id="1_26142"
                            className="Pixso-instance-1_26142 pixso-relative-no-shrink"
                        ></Darkmodenothemegreentypeaccentsizebig>
                    ))}
                {slot_1_26143 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26143"
                            className="Pixso-instance-1_26143 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypesecondarystatepressedsizebig;
