import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemebluetypedisablesizebig from "@/components/Darkmodenothemebluetypedisablesizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemebluetypedisabledstatepressedsizebig.css";
interface DarkModenothemebluetypedisabledstatepressedsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26290?: React.ReactNode;
    slot_1_26291?: React.ReactNode;
    slot_1_26292?: React.ReactNode;
    slot_1_26293?: React.ReactNode;
}
const DarkModenothemebluetypedisabledstatepressedsizebig = (
    props: DarkModenothemebluetypedisabledstatepressedsizebigProps
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
        slot_1_26290,
        slot_1_26291,
        slot_1_26292,
        slot_1_26293
    } = props;

    return (
        <div
            className={["component-1_26289", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26289"
                className="Pixso-symbol-1_26289 fill-light_contentplashka-1_30125 pixso-relative-flex"
            >
                {slot_1_26290 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26290"
                            className="Pixso-instance-1_26290 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26291 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26291"
                            className="Pixso-paragraph-1_26291 fill-light_contentdisabled-1_30128-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26292 ??
                    (visible_4958_42 && (
                        <Darkmodenothemebluetypedisablesizebig
                            id="1_26292"
                            className="Pixso-instance-1_26292 pixso-relative-no-shrink"
                        ></Darkmodenothemebluetypedisablesizebig>
                    ))}
                {slot_1_26293 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26293"
                            className="Pixso-instance-1_26293 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypedisabledstatepressedsizebig;
