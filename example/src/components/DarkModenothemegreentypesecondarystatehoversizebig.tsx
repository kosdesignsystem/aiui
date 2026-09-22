import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemegreentypeaccentsizebig from "@/components/Darkmodenothemegreentypeaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemegreentypesecondarystatehoversizebig.css";
interface DarkModenothemegreentypesecondarystatehoversizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26135?: React.ReactNode;
    slot_1_26136?: React.ReactNode;
    slot_1_26137?: React.ReactNode;
    slot_1_26138?: React.ReactNode;
}
const DarkModenothemegreentypesecondarystatehoversizebig = (
    props: DarkModenothemegreentypesecondarystatehoversizebigProps
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
        slot_1_26135,
        slot_1_26136,
        slot_1_26137,
        slot_1_26138
    } = props;

    return (
        <div
            className={["component-1_26134", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26134"
                className="Pixso-symbol-1_26134 fill-light-default_primary-hover-1_10478 pixso-relative-flex"
            >
                {slot_1_26135 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26135"
                            className="Pixso-instance-1_26135 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26136 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26136"
                            className="Pixso-paragraph-1_26136 fill-light_contentprimary-1_10528-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26137 ??
                    (visible_4958_42 && (
                        <Darkmodenothemegreentypeaccentsizebig
                            id="1_26137"
                            className="Pixso-instance-1_26137 pixso-relative-no-shrink"
                        ></Darkmodenothemegreentypeaccentsizebig>
                    ))}
                {slot_1_26138 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26138"
                            className="Pixso-instance-1_26138 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypesecondarystatehoversizebig;
