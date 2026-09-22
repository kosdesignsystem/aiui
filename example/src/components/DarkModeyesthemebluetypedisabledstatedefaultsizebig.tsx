import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemebluetypedisablesizebig from "@/components/Darkmodeyesthemebluetypedisablesizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemebluetypedisabledstatedefaultsizebig.css";
interface DarkModeyesthemebluetypedisabledstatedefaultsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26295?: React.ReactNode;
    slot_1_26296?: React.ReactNode;
    slot_1_26297?: React.ReactNode;
    slot_1_26298?: React.ReactNode;
}
const DarkModeyesthemebluetypedisabledstatedefaultsizebig = (
    props: DarkModeyesthemebluetypedisabledstatedefaultsizebigProps
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
        slot_1_26295,
        slot_1_26296,
        slot_1_26297,
        slot_1_26298
    } = props;

    return (
        <div
            className={["component-1_26294", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26294"
                className="Pixso-symbol-1_26294 fill-dark_contentplashka-1_30095 pixso-relative-flex"
            >
                {slot_1_26295 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26295"
                            className="Pixso-instance-1_26295 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26296 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26296"
                            className="Pixso-paragraph-1_26296 fill-dark_contentdisabled-1_30129-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26297 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemebluetypedisablesizebig
                            id="1_26297"
                            className="Pixso-instance-1_26297 pixso-relative-no-shrink"
                        ></Darkmodeyesthemebluetypedisablesizebig>
                    ))}
                {slot_1_26298 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26298"
                            className="Pixso-instance-1_26298 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemebluetypedisabledstatedefaultsizebig;
