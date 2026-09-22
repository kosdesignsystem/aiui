import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemegreentypeaccentsizebig from "@/components/Darkmodenothemegreentypeaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemegreentypesubprimarystatepressedsizebig.css";
interface DarkModenothemegreentypesubprimarystatepressedsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26050?: React.ReactNode;
    slot_1_26051?: React.ReactNode;
    slot_1_26052?: React.ReactNode;
    slot_1_26053?: React.ReactNode;
}
const DarkModenothemegreentypesubprimarystatepressedsizebig = (
    props: DarkModenothemegreentypesubprimarystatepressedsizebigProps
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
        slot_1_26050,
        slot_1_26051,
        slot_1_26052,
        slot_1_26053
    } = props;

    return (
        <div
            className={["component-1_26049", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26049"
                className="Pixso-symbol-1_26049 fill-light-green_secondary-pressed-1_10468 pixso-relative-flex"
            >
                {slot_1_26050 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26050"
                            className="Pixso-instance-1_26050 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26051 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26051"
                            className="Pixso-paragraph-1_26051 fill-greenprimary-1_30120-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26052 ??
                    (visible_4958_42 && (
                        <Darkmodenothemegreentypeaccentsizebig
                            id="1_26052"
                            className="Pixso-instance-1_26052 pixso-relative-no-shrink"
                        ></Darkmodenothemegreentypeaccentsizebig>
                    ))}
                {slot_1_26053 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26053"
                            className="Pixso-instance-1_26053 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypesubprimarystatepressedsizebig;
