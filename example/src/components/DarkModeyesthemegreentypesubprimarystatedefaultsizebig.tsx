import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemegreentypeaccentsizebig from "@/components/Darkmodeyesthemegreentypeaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemegreentypesubprimarystatedefaultsizebig.css";
interface DarkModeyesthemegreentypesubprimarystatedefaultsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26055?: React.ReactNode;
    slot_1_26056?: React.ReactNode;
    slot_1_26057?: React.ReactNode;
    slot_1_26058?: React.ReactNode;
}
const DarkModeyesthemegreentypesubprimarystatedefaultsizebig = (
    props: DarkModeyesthemegreentypesubprimarystatedefaultsizebigProps
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
        slot_1_26055,
        slot_1_26056,
        slot_1_26057,
        slot_1_26058
    } = props;

    return (
        <div
            className={["component-1_26054", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26054"
                className="Pixso-symbol-1_26054 fill-greenplashka-1_30123 pixso-relative-flex"
            >
                {slot_1_26055 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26055"
                            className="Pixso-instance-1_26055 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26056 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26056"
                            className="Pixso-paragraph-1_26056 fill-greenprimary-1_30120-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26057 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemegreentypeaccentsizebig
                            id="1_26057"
                            className="Pixso-instance-1_26057 pixso-relative-no-shrink"
                        ></Darkmodeyesthemegreentypeaccentsizebig>
                    ))}
                {slot_1_26058 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26058"
                            className="Pixso-instance-1_26058 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypesubprimarystatedefaultsizebig;
