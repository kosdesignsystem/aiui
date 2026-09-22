import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemegreentypedefaultsizebig from "@/components/Darkmodenothemegreentypedefaultsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemegreentypedefaultstatepressedsizebig.css";
interface DarkModenothemegreentypedefaultstatepressedsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26230?: React.ReactNode;
    slot_1_26231?: React.ReactNode;
    slot_1_26232?: React.ReactNode;
    slot_1_26233?: React.ReactNode;
}
const DarkModenothemegreentypedefaultstatepressedsizebig = (
    props: DarkModenothemegreentypedefaultstatepressedsizebigProps
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
        slot_1_26230,
        slot_1_26231,
        slot_1_26232,
        slot_1_26233
    } = props;

    return (
        <div
            className={["component-1_26229", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26229"
                className="Pixso-symbol-1_26229 fill-light-default_secondary-pressed-1_10484 pixso-relative-flex"
            >
                {slot_1_26230 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26230"
                            className="Pixso-instance-1_26230 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26231 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26231"
                            className="Pixso-paragraph-1_26231 fill-light_contentprimary-1_10528-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26232 ??
                    (visible_4958_42 && (
                        <Darkmodenothemegreentypedefaultsizebig
                            id="1_26232"
                            className="Pixso-instance-1_26232 pixso-relative-no-shrink"
                        ></Darkmodenothemegreentypedefaultsizebig>
                    ))}
                {slot_1_26233 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26233"
                            className="Pixso-instance-1_26233 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypedefaultstatepressedsizebig;
