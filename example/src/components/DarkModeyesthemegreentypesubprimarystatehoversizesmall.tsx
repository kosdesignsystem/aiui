import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemegreentypeaccentsizesmall from "@/components/Darkmodeyesthemegreentypeaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemegreentypesubprimarystatehoversizesmall.css";
interface DarkModeyesthemegreentypesubprimarystatehoversizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26510?: React.ReactNode;
    slot_1_26511?: React.ReactNode;
    slot_1_26512?: React.ReactNode;
    slot_1_26513?: React.ReactNode;
}
const DarkModeyesthemegreentypesubprimarystatehoversizesmall = (
    props: DarkModeyesthemegreentypesubprimarystatehoversizesmallProps
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
        slot_1_26510,
        slot_1_26511,
        slot_1_26512,
        slot_1_26513
    } = props;

    return (
        <div
            className={["component-1_26509", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26509"
                className="Pixso-symbol-1_26509 fill-dark-green_secondary-hover-1_10467 pixso-relative-flex"
            >
                {slot_1_26510 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26510"
                            className="Pixso-instance-1_26510 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26511 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26511"
                            className="Pixso-paragraph-1_26511 fill-greenprimary-1_30120-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26512 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemegreentypeaccentsizesmall
                            id="1_26512"
                            className="Pixso-instance-1_26512 pixso-relative-no-shrink"
                        ></Darkmodeyesthemegreentypeaccentsizesmall>
                    ))}
                {slot_1_26513 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26513"
                            className="Pixso-instance-1_26513 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypesubprimarystatehoversizesmall;
