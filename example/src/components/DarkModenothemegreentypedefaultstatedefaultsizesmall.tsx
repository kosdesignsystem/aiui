import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemegreentypedefaultsizesmall from "@/components/Darkmodenothemegreentypedefaultsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemegreentypedefaultstatedefaultsizesmall.css";
interface DarkModenothemegreentypedefaultstatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26670?: React.ReactNode;
    slot_1_26671?: React.ReactNode;
    slot_1_26672?: React.ReactNode;
    slot_1_26673?: React.ReactNode;
}
const DarkModenothemegreentypedefaultstatedefaultsizesmall = (
    props: DarkModenothemegreentypedefaultstatedefaultsizesmallProps
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
        slot_1_26670,
        slot_1_26671,
        slot_1_26672,
        slot_1_26673
    } = props;

    return (
        <div
            className={["component-1_26669", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26669"
                className="Pixso-symbol-1_26669 pixso-relative-flex"
            >
                {slot_1_26670 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26670"
                            className="Pixso-instance-1_26670 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26671 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26671"
                            className="Pixso-paragraph-1_26671 fill-light_contentprimary-1_10528-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26672 ??
                    (visible_4958_42 && (
                        <Darkmodenothemegreentypedefaultsizesmall
                            id="1_26672"
                            className="Pixso-instance-1_26672 pixso-relative-no-shrink"
                        ></Darkmodenothemegreentypedefaultsizesmall>
                    ))}
                {slot_1_26673 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26673"
                            className="Pixso-instance-1_26673 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypedefaultstatedefaultsizesmall;
