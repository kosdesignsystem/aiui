import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemegreentypeaccentsizesmall from "@/components/Darkmodenothemegreentypeaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemegreentypesubprimarystatedefaultsizesmall.css";
interface DarkModenothemegreentypesubprimarystatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26490?: React.ReactNode;
    slot_1_26491?: React.ReactNode;
    slot_1_26492?: React.ReactNode;
    slot_1_26493?: React.ReactNode;
}
const DarkModenothemegreentypesubprimarystatedefaultsizesmall = (
    props: DarkModenothemegreentypesubprimarystatedefaultsizesmallProps
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
        slot_1_26490,
        slot_1_26491,
        slot_1_26492,
        slot_1_26493
    } = props;

    return (
        <div
            className={["component-1_26489", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26489"
                className="Pixso-symbol-1_26489 fill-greenplashka-1_30123 pixso-relative-flex"
            >
                {slot_1_26490 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26490"
                            className="Pixso-instance-1_26490 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26491 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26491"
                            className="Pixso-paragraph-1_26491 fill-greenprimary-1_30120-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26492 ??
                    (visible_4958_42 && (
                        <Darkmodenothemegreentypeaccentsizesmall
                            id="1_26492"
                            className="Pixso-instance-1_26492 pixso-relative-no-shrink"
                        ></Darkmodenothemegreentypeaccentsizesmall>
                    ))}
                {slot_1_26493 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26493"
                            className="Pixso-instance-1_26493 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypesubprimarystatedefaultsizesmall;
