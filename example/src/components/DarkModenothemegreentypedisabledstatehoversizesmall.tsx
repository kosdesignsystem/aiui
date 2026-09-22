import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemegreentypedisablesizesmall from "@/components/Darkmodenothemegreentypedisablesizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemegreentypedisabledstatehoversizesmall.css";
interface DarkModenothemegreentypedisabledstatehoversizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26765?: React.ReactNode;
    slot_1_26766?: React.ReactNode;
    slot_1_26767?: React.ReactNode;
    slot_1_26768?: React.ReactNode;
}
const DarkModenothemegreentypedisabledstatehoversizesmall = (
    props: DarkModenothemegreentypedisabledstatehoversizesmallProps
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
        slot_1_26765,
        slot_1_26766,
        slot_1_26767,
        slot_1_26768
    } = props;

    return (
        <div
            className={["component-1_26764", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26764"
                className="Pixso-symbol-1_26764 fill-light_contentplashka-1_30125 pixso-relative-flex"
            >
                {slot_1_26765 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26765"
                            className="Pixso-instance-1_26765 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26766 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26766"
                            className="Pixso-paragraph-1_26766 fill-light_contentdisabled-1_30128-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26767 ??
                    (visible_4958_42 && (
                        <Darkmodenothemegreentypedisablesizesmall
                            id="1_26767"
                            className="Pixso-instance-1_26767 pixso-relative-no-shrink"
                        ></Darkmodenothemegreentypedisablesizesmall>
                    ))}
                {slot_1_26768 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26768"
                            className="Pixso-instance-1_26768 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypedisabledstatehoversizesmall;
