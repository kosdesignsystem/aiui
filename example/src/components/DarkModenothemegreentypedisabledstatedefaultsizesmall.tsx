import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemegreentypedisablesizesmall from "@/components/Darkmodenothemegreentypedisablesizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemegreentypedisabledstatedefaultsizesmall.css";
interface DarkModenothemegreentypedisabledstatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26760?: React.ReactNode;
    slot_1_26761?: React.ReactNode;
    slot_1_26762?: React.ReactNode;
    slot_1_26763?: React.ReactNode;
}
const DarkModenothemegreentypedisabledstatedefaultsizesmall = (
    props: DarkModenothemegreentypedisabledstatedefaultsizesmallProps
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
        slot_1_26760,
        slot_1_26761,
        slot_1_26762,
        slot_1_26763
    } = props;

    return (
        <div
            className={["component-1_26759", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26759"
                className="Pixso-symbol-1_26759 fill-light_contentplashka-1_30125 pixso-relative-flex"
            >
                {slot_1_26760 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26760"
                            className="Pixso-instance-1_26760 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26761 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26761"
                            className="Pixso-paragraph-1_26761 fill-light_contentdisabled-1_30128-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26762 ??
                    (visible_4958_42 && (
                        <Darkmodenothemegreentypedisablesizesmall
                            id="1_26762"
                            className="Pixso-instance-1_26762 pixso-relative-no-shrink"
                        ></Darkmodenothemegreentypedisablesizesmall>
                    ))}
                {slot_1_26763 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26763"
                            className="Pixso-instance-1_26763 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypedisabledstatedefaultsizesmall;
