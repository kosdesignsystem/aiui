import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemepurpletypedisablesizesmall from "@/components/Darkmodenothemepurpletypedisablesizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemepurpletypedisabledstatehoversizesmall.css";
interface DarkModenothemepurpletypedisabledstatehoversizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26795?: React.ReactNode;
    slot_1_26796?: React.ReactNode;
    slot_1_26797?: React.ReactNode;
    slot_1_26798?: React.ReactNode;
}
const DarkModenothemepurpletypedisabledstatehoversizesmall = (
    props: DarkModenothemepurpletypedisabledstatehoversizesmallProps
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
        slot_1_26795,
        slot_1_26796,
        slot_1_26797,
        slot_1_26798
    } = props;

    return (
        <div
            className={["component-1_26794", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26794"
                className="Pixso-symbol-1_26794 fill-light_contentplashka-1_30125 pixso-relative-flex"
            >
                {slot_1_26795 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26795"
                            className="Pixso-instance-1_26795 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26796 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26796"
                            className="Pixso-paragraph-1_26796 fill-light_contentdisabled-1_30128-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26797 ??
                    (visible_4958_42 && (
                        <Darkmodenothemepurpletypedisablesizesmall
                            id="1_26797"
                            className="Pixso-instance-1_26797 pixso-relative-no-shrink"
                        ></Darkmodenothemepurpletypedisablesizesmall>
                    ))}
                {slot_1_26798 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26798"
                            className="Pixso-instance-1_26798 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypedisabledstatehoversizesmall;
