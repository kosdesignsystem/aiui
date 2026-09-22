import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemepurpletypedisablesizebig from "@/components/Darkmodenothemepurpletypedisablesizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemepurpletypedisabledstatedefaultsizebig.css";
interface DarkModenothemepurpletypedisabledstatedefaultsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26340?: React.ReactNode;
    slot_1_26341?: React.ReactNode;
    slot_1_26342?: React.ReactNode;
    slot_1_26343?: React.ReactNode;
}
const DarkModenothemepurpletypedisabledstatedefaultsizebig = (
    props: DarkModenothemepurpletypedisabledstatedefaultsizebigProps
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
        slot_1_26340,
        slot_1_26341,
        slot_1_26342,
        slot_1_26343
    } = props;

    return (
        <div
            className={["component-1_26339", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26339"
                className="Pixso-symbol-1_26339 fill-light_contentplashka-1_30125 pixso-relative-flex"
            >
                {slot_1_26340 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26340"
                            className="Pixso-instance-1_26340 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26341 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26341"
                            className="Pixso-paragraph-1_26341 fill-light_contentdisabled-1_30128-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26342 ??
                    (visible_4958_42 && (
                        <Darkmodenothemepurpletypedisablesizebig
                            id="1_26342"
                            className="Pixso-instance-1_26342 pixso-relative-no-shrink"
                        ></Darkmodenothemepurpletypedisablesizebig>
                    ))}
                {slot_1_26343 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26343"
                            className="Pixso-instance-1_26343 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypedisabledstatedefaultsizebig;
