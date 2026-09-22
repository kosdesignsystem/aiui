import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemegreentypeaccentsizebig from "@/components/Darkmodenothemegreentypeaccentsizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemegreentypesubprimarystatedefaultsizebig.css";
interface DarkModenothemegreentypesubprimarystatedefaultsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26040?: React.ReactNode;
    slot_1_26041?: React.ReactNode;
    slot_1_26042?: React.ReactNode;
    slot_1_26043?: React.ReactNode;
}
const DarkModenothemegreentypesubprimarystatedefaultsizebig = (
    props: DarkModenothemegreentypesubprimarystatedefaultsizebigProps
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
        slot_1_26040,
        slot_1_26041,
        slot_1_26042,
        slot_1_26043
    } = props;

    return (
        <div
            className={["component-1_26039", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26039"
                className="Pixso-symbol-1_26039 fill-greenplashka-1_30123 pixso-relative-flex"
            >
                {slot_1_26040 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26040"
                            className="Pixso-instance-1_26040 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26041 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26041"
                            className="Pixso-paragraph-1_26041 fill-greenprimary-1_30120-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26042 ??
                    (visible_4958_42 && (
                        <Darkmodenothemegreentypeaccentsizebig
                            id="1_26042"
                            className="Pixso-instance-1_26042 pixso-relative-no-shrink"
                        ></Darkmodenothemegreentypeaccentsizebig>
                    ))}
                {slot_1_26043 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26043"
                            className="Pixso-instance-1_26043 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypesubprimarystatedefaultsizebig;
