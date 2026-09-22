import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemegreentypedisablesizebig from "@/components/Darkmodeyesthemegreentypedisablesizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemegreentypedisabledstatepressedsizebig.css";
interface DarkModeyesthemegreentypedisabledstatepressedsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26335?: React.ReactNode;
    slot_1_26336?: React.ReactNode;
    slot_1_26337?: React.ReactNode;
    slot_1_26338?: React.ReactNode;
}
const DarkModeyesthemegreentypedisabledstatepressedsizebig = (
    props: DarkModeyesthemegreentypedisabledstatepressedsizebigProps
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
        slot_1_26335,
        slot_1_26336,
        slot_1_26337,
        slot_1_26338
    } = props;

    return (
        <div
            className={["component-1_26334", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26334"
                className="Pixso-symbol-1_26334 fill-dark_contentplashka-1_30095 pixso-relative-flex"
            >
                {slot_1_26335 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26335"
                            className="Pixso-instance-1_26335 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26336 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26336"
                            className="Pixso-paragraph-1_26336 fill-dark_contentdisabled-1_30129-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26337 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemegreentypedisablesizebig
                            id="1_26337"
                            className="Pixso-instance-1_26337 pixso-relative-no-shrink"
                        ></Darkmodeyesthemegreentypedisablesizebig>
                    ))}
                {slot_1_26338 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26338"
                            className="Pixso-instance-1_26338 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypedisabledstatepressedsizebig;
