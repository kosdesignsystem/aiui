import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemepurpletypedisablesizesmall from "@/components/Darkmodenothemepurpletypedisablesizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemepurpletypedisabledstatedefaultsizesmall.css";
interface DarkModenothemepurpletypedisabledstatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26790?: React.ReactNode;
    slot_1_26791?: React.ReactNode;
    slot_1_26792?: React.ReactNode;
    slot_1_26793?: React.ReactNode;
}
const DarkModenothemepurpletypedisabledstatedefaultsizesmall = (
    props: DarkModenothemepurpletypedisabledstatedefaultsizesmallProps
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
        slot_1_26790,
        slot_1_26791,
        slot_1_26792,
        slot_1_26793
    } = props;

    return (
        <div
            className={["component-1_26789", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26789"
                className="Pixso-symbol-1_26789 fill-light_contentplashka-1_30125 pixso-relative-flex"
            >
                {slot_1_26790 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26790"
                            className="Pixso-instance-1_26790 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26791 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26791"
                            className="Pixso-paragraph-1_26791 fill-light_contentdisabled-1_30128-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26792 ??
                    (visible_4958_42 && (
                        <Darkmodenothemepurpletypedisablesizesmall
                            id="1_26792"
                            className="Pixso-instance-1_26792 pixso-relative-no-shrink"
                        ></Darkmodenothemepurpletypedisablesizesmall>
                    ))}
                {slot_1_26793 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26793"
                            className="Pixso-instance-1_26793 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypedisabledstatedefaultsizesmall;
