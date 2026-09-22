import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemegreentypedisablesizesmall from "@/components/Darkmodenothemegreentypedisablesizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemegreentypedisabledstatepressedsizesmall.css";
interface DarkModenothemegreentypedisabledstatepressedsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26770?: React.ReactNode;
    slot_1_26771?: React.ReactNode;
    slot_1_26772?: React.ReactNode;
    slot_1_26773?: React.ReactNode;
}
const DarkModenothemegreentypedisabledstatepressedsizesmall = (
    props: DarkModenothemegreentypedisabledstatepressedsizesmallProps
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
        slot_1_26770,
        slot_1_26771,
        slot_1_26772,
        slot_1_26773
    } = props;

    return (
        <div
            className={["component-1_26769", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26769"
                className="Pixso-symbol-1_26769 fill-light_contentplashka-1_30125 pixso-relative-flex"
            >
                {slot_1_26770 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26770"
                            className="Pixso-instance-1_26770 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26771 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26771"
                            className="Pixso-paragraph-1_26771 fill-light_contentdisabled-1_30128-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26772 ??
                    (visible_4958_42 && (
                        <Darkmodenothemegreentypedisablesizesmall
                            id="1_26772"
                            className="Pixso-instance-1_26772 pixso-relative-no-shrink"
                        ></Darkmodenothemegreentypedisablesizesmall>
                    ))}
                {slot_1_26773 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26773"
                            className="Pixso-instance-1_26773 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypedisabledstatepressedsizesmall;
