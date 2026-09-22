import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemebluetypeonaccentsizesmall from "@/components/Darkmodenothemebluetypeonaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemebluetypeprimarystatepressedsizesmall.css";
interface DarkModenothemebluetypeprimarystatepressedsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26380?: React.ReactNode;
    slot_1_26381?: React.ReactNode;
    slot_1_26382?: React.ReactNode;
    slot_1_26383?: React.ReactNode;
}
const DarkModenothemebluetypeprimarystatepressedsizesmall = (
    props: DarkModenothemebluetypeprimarystatepressedsizesmallProps
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
        slot_1_26380,
        slot_1_26381,
        slot_1_26382,
        slot_1_26383
    } = props;

    return (
        <div
            className={["component-1_26379", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26379"
                className="Pixso-symbol-1_26379 fill-lightblue_primarypressed-1_10449 pixso-relative-flex"
            >
                {slot_1_26380 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26380"
                            className="Pixso-instance-1_26380 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26381 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26381"
                            className="Pixso-paragraph-1_26381 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26382 ??
                    (visible_4958_42 && (
                        <Darkmodenothemebluetypeonaccentsizesmall
                            id="1_26382"
                            className="Pixso-instance-1_26382 pixso-relative-no-shrink"
                        ></Darkmodenothemebluetypeonaccentsizesmall>
                    ))}
                {slot_1_26383 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26383"
                            className="Pixso-instance-1_26383 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemebluetypeprimarystatepressedsizesmall;
