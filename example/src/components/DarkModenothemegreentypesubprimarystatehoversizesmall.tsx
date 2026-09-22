import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemegreentypeaccentsizesmall from "@/components/Darkmodenothemegreentypeaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemegreentypesubprimarystatehoversizesmall.css";
interface DarkModenothemegreentypesubprimarystatehoversizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26495?: React.ReactNode;
    slot_1_26496?: React.ReactNode;
    slot_1_26497?: React.ReactNode;
    slot_1_26498?: React.ReactNode;
}
const DarkModenothemegreentypesubprimarystatehoversizesmall = (
    props: DarkModenothemegreentypesubprimarystatehoversizesmallProps
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
        slot_1_26495,
        slot_1_26496,
        slot_1_26497,
        slot_1_26498
    } = props;

    return (
        <div
            className={["component-1_26494", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26494"
                className="Pixso-symbol-1_26494 fill-light-green_secondary-hover-1_10466 pixso-relative-flex"
            >
                {slot_1_26495 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26495"
                            className="Pixso-instance-1_26495 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26496 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26496"
                            className="Pixso-paragraph-1_26496 fill-greenprimary-1_30120-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26497 ??
                    (visible_4958_42 && (
                        <Darkmodenothemegreentypeaccentsizesmall
                            id="1_26497"
                            className="Pixso-instance-1_26497 pixso-relative-no-shrink"
                        ></Darkmodenothemegreentypeaccentsizesmall>
                    ))}
                {slot_1_26498 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26498"
                            className="Pixso-instance-1_26498 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypesubprimarystatehoversizesmall;
