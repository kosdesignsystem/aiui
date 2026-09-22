import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemegreentypedefaultsizesmall from "@/components/Darkmodenothemegreentypedefaultsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemegreentypedefaultstatepressedsizesmall.css";
interface DarkModenothemegreentypedefaultstatepressedsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26680?: React.ReactNode;
    slot_1_26681?: React.ReactNode;
    slot_1_26682?: React.ReactNode;
    slot_1_26683?: React.ReactNode;
}
const DarkModenothemegreentypedefaultstatepressedsizesmall = (
    props: DarkModenothemegreentypedefaultstatepressedsizesmallProps
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
        slot_1_26680,
        slot_1_26681,
        slot_1_26682,
        slot_1_26683
    } = props;

    return (
        <div
            className={["component-1_26679", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26679"
                className="Pixso-symbol-1_26679 fill-light-default_secondary-pressed-1_10484 pixso-relative-flex"
            >
                {slot_1_26680 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26680"
                            className="Pixso-instance-1_26680 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26681 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26681"
                            className="Pixso-paragraph-1_26681 fill-light_contentprimary-1_10528-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26682 ??
                    (visible_4958_42 && (
                        <Darkmodenothemegreentypedefaultsizesmall
                            id="1_26682"
                            className="Pixso-instance-1_26682 pixso-relative-no-shrink"
                        ></Darkmodenothemegreentypedefaultsizesmall>
                    ))}
                {slot_1_26683 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26683"
                            className="Pixso-instance-1_26683 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypedefaultstatepressedsizesmall;
