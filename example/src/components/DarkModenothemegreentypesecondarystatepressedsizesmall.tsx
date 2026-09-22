import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemegreentypeaccentsizesmall from "@/components/Darkmodenothemegreentypeaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemegreentypesecondarystatepressedsizesmall.css";
interface DarkModenothemegreentypesecondarystatepressedsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26590?: React.ReactNode;
    slot_1_26591?: React.ReactNode;
    slot_1_26592?: React.ReactNode;
    slot_1_26593?: React.ReactNode;
}
const DarkModenothemegreentypesecondarystatepressedsizesmall = (
    props: DarkModenothemegreentypesecondarystatepressedsizesmallProps
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
        slot_1_26590,
        slot_1_26591,
        slot_1_26592,
        slot_1_26593
    } = props;

    return (
        <div
            className={["component-1_26589", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26589"
                className="Pixso-symbol-1_26589 fill-light-default_primary-pressed-1_10480 pixso-relative-flex"
            >
                {slot_1_26590 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26590"
                            className="Pixso-instance-1_26590 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26591 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26591"
                            className="Pixso-paragraph-1_26591 fill-light_contentprimary-1_10528-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26592 ??
                    (visible_4958_42 && (
                        <Darkmodenothemegreentypeaccentsizesmall
                            id="1_26592"
                            className="Pixso-instance-1_26592 pixso-relative-no-shrink"
                        ></Darkmodenothemegreentypeaccentsizesmall>
                    ))}
                {slot_1_26593 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26593"
                            className="Pixso-instance-1_26593 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypesecondarystatepressedsizesmall;
