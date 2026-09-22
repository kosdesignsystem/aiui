import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemegreentypeaccentsizebig from "@/components/Darkmodeyesthemegreentypeaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemegreentypesecondarystatedefaultsizebig.css";
interface DarkModeyesthemegreentypesecondarystatedefaultsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26145?: React.ReactNode;
    slot_1_26146?: React.ReactNode;
    slot_1_26147?: React.ReactNode;
    slot_1_26148?: React.ReactNode;
}
const DarkModeyesthemegreentypesecondarystatedefaultsizebig = (
    props: DarkModeyesthemegreentypesecondarystatedefaultsizebigProps
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
        slot_1_26145,
        slot_1_26146,
        slot_1_26147,
        slot_1_26148
    } = props;

    return (
        <div
            className={["component-1_26144", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26144"
                className="Pixso-symbol-1_26144 fill-dark_contentplashka-1_30095 pixso-relative-flex"
            >
                {slot_1_26145 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26145"
                            className="Pixso-instance-1_26145 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26146 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26146"
                            className="Pixso-paragraph-1_26146 fill-dark_contentprimary-1_10529-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26147 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemegreentypeaccentsizebig
                            id="1_26147"
                            className="Pixso-instance-1_26147 pixso-relative-no-shrink"
                        ></Darkmodeyesthemegreentypeaccentsizebig>
                    ))}
                {slot_1_26148 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26148"
                            className="Pixso-instance-1_26148 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypesecondarystatedefaultsizebig;
