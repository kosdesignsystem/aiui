import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemegreentypeaccentsizebig from "@/components/Darkmodenothemegreentypeaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemegreentypesubprimarystatehoversizebig.css";
interface DarkModenothemegreentypesubprimarystatehoversizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26045?: React.ReactNode;
    slot_1_26046?: React.ReactNode;
    slot_1_26047?: React.ReactNode;
    slot_1_26048?: React.ReactNode;
}
const DarkModenothemegreentypesubprimarystatehoversizebig = (
    props: DarkModenothemegreentypesubprimarystatehoversizebigProps
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
        slot_1_26045,
        slot_1_26046,
        slot_1_26047,
        slot_1_26048
    } = props;

    return (
        <div
            className={["component-1_26044", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26044"
                className="Pixso-symbol-1_26044 fill-light-green_secondary-hover-1_10466 pixso-relative-flex"
            >
                {slot_1_26045 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26045"
                            className="Pixso-instance-1_26045 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26046 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26046"
                            className="Pixso-paragraph-1_26046 fill-greenprimary-1_30120-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26047 ??
                    (visible_4958_42 && (
                        <Darkmodenothemegreentypeaccentsizebig
                            id="1_26047"
                            className="Pixso-instance-1_26047 pixso-relative-no-shrink"
                        ></Darkmodenothemegreentypeaccentsizebig>
                    ))}
                {slot_1_26048 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26048"
                            className="Pixso-instance-1_26048 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypesubprimarystatehoversizebig;
