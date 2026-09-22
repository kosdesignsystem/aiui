import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemegreentypeaccentsizesmall from "@/components/Darkmodenothemegreentypeaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemegreentypesecondarystatedefaultsizesmall.css";
interface DarkModenothemegreentypesecondarystatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26580?: React.ReactNode;
    slot_1_26581?: React.ReactNode;
    slot_1_26582?: React.ReactNode;
    slot_1_26583?: React.ReactNode;
}
const DarkModenothemegreentypesecondarystatedefaultsizesmall = (
    props: DarkModenothemegreentypesecondarystatedefaultsizesmallProps
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
        slot_1_26580,
        slot_1_26581,
        slot_1_26582,
        slot_1_26583
    } = props;

    return (
        <div
            className={["component-1_26579", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26579"
                className="Pixso-symbol-1_26579 fill-light_contentplashka-1_30125 pixso-relative-flex"
            >
                {slot_1_26580 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26580"
                            className="Pixso-instance-1_26580 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26581 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26581"
                            className="Pixso-paragraph-1_26581 fill-light_contentprimary-1_10528-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26582 ??
                    (visible_4958_42 && (
                        <Darkmodenothemegreentypeaccentsizesmall
                            id="1_26582"
                            className="Pixso-instance-1_26582 pixso-relative-no-shrink"
                        ></Darkmodenothemegreentypeaccentsizesmall>
                    ))}
                {slot_1_26583 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26583"
                            className="Pixso-instance-1_26583 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypesecondarystatedefaultsizesmall;
