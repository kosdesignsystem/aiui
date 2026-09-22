import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemegreentypedisablesizebig from "@/components/Darkmodenothemegreentypedisablesizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemegreentypedisabledstatepressedsizebig.css";
interface DarkModenothemegreentypedisabledstatepressedsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26320?: React.ReactNode;
    slot_1_26321?: React.ReactNode;
    slot_1_26322?: React.ReactNode;
    slot_1_26323?: React.ReactNode;
}
const DarkModenothemegreentypedisabledstatepressedsizebig = (
    props: DarkModenothemegreentypedisabledstatepressedsizebigProps
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
        slot_1_26320,
        slot_1_26321,
        slot_1_26322,
        slot_1_26323
    } = props;

    return (
        <div
            className={["component-1_26319", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26319"
                className="Pixso-symbol-1_26319 fill-light_contentplashka-1_30125 pixso-relative-flex"
            >
                {slot_1_26320 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26320"
                            className="Pixso-instance-1_26320 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26321 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26321"
                            className="Pixso-paragraph-1_26321 fill-light_contentdisabled-1_30128-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26322 ??
                    (visible_4958_42 && (
                        <Darkmodenothemegreentypedisablesizebig
                            id="1_26322"
                            className="Pixso-instance-1_26322 pixso-relative-no-shrink"
                        ></Darkmodenothemegreentypedisablesizebig>
                    ))}
                {slot_1_26323 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26323"
                            className="Pixso-instance-1_26323 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypedisabledstatepressedsizebig;
