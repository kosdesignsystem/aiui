import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemegreentypeaccentsizesmall from "@/components/Darkmodeyesthemegreentypeaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemegreentypesubprimarystatedefaultsizesmall.css";
interface DarkModeyesthemegreentypesubprimarystatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26505?: React.ReactNode;
    slot_1_26506?: React.ReactNode;
    slot_1_26507?: React.ReactNode;
    slot_1_26508?: React.ReactNode;
}
const DarkModeyesthemegreentypesubprimarystatedefaultsizesmall = (
    props: DarkModeyesthemegreentypesubprimarystatedefaultsizesmallProps
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
        slot_1_26505,
        slot_1_26506,
        slot_1_26507,
        slot_1_26508
    } = props;

    return (
        <div
            className={["component-1_26504", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26504"
                className="Pixso-symbol-1_26504 fill-greenplashka-1_30123 pixso-relative-flex"
            >
                {slot_1_26505 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26505"
                            className="Pixso-instance-1_26505 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26506 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26506"
                            className="Pixso-paragraph-1_26506 fill-greenprimary-1_30120-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26507 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemegreentypeaccentsizesmall
                            id="1_26507"
                            className="Pixso-instance-1_26507 pixso-relative-no-shrink"
                        ></Darkmodeyesthemegreentypeaccentsizesmall>
                    ))}
                {slot_1_26508 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26508"
                            className="Pixso-instance-1_26508 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypesubprimarystatedefaultsizesmall;
