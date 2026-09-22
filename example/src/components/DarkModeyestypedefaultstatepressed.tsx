import Statusinfo180 from "@/components/Statusinfo180";
import Typewhitedarkmodeyes from "@/components/Typewhitedarkmodeyes";
import Actionschevronright181 from "@/components/Actionschevronright181";
import "@/styles/DarkModeyestypedefaultstatepressed.css";
interface DarkModeyestypedefaultstatepressedProps {
    text_4846_0?: string;
    visible_4846_41?: boolean;
    visible_4846_83?: boolean;
    instance_4846_125?: string;
    visible_4846_167?: boolean;
    visible_4846_209?: boolean;
    instance_4846_251?: string;
    id?: string;
    className?: string;
    slot_3001_9932?: React.ReactNode;
    slot_3001_9933?: React.ReactNode;
    slot_3001_9934?: React.ReactNode;
    slot_3001_9935?: React.ReactNode;
}
const DarkModeyestypedefaultstatepressed = (
    props: DarkModeyestypedefaultstatepressedProps
) => {
    const {
        text_4846_0 = "Button",
        visible_4846_41 = true,
        visible_4846_83 = false,
        instance_4846_125 = "Component_3001_9749",
        visible_4846_167 = false,
        visible_4846_209 = false,
        instance_4846_251 = "Component_3001_9747",
        id,
        className = "",
        slot_3001_9932,
        slot_3001_9933,
        slot_3001_9934,
        slot_3001_9935
    } = props;

    return (
        <div
            className={["component-3001_9930", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9930"
                className="Pixso-symbol-3001_9930 pixso-relative-flex"
            >
                <div id="3001_9931" className="Pixso-rectangle-3001_9931"></div>
                {slot_3001_9932 ??
                    (visible_4846_83 && (
                        <Statusinfo180
                            id="3001_9932"
                            className="Pixso-instance-3001_9932 pixso-relative-no-shrink"
                        ></Statusinfo180>
                    ))}
                {slot_3001_9933 ??
                    (visible_4846_41 && (
                        <p
                            id="3001_9933"
                            className="Pixso-paragraph-3001_9933 fill-darkcontentprimary-1_10409-paragraph text-bold16-3001_9753 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4846_0 ?? "Button"}
                        </p>
                    ))}
                {slot_3001_9934 ??
                    (visible_4846_167 && (
                        <Typewhitedarkmodeyes
                            id="3001_9934"
                            className="Pixso-instance-3001_9934 pixso-relative-no-shrink"
                        ></Typewhitedarkmodeyes>
                    ))}
                {slot_3001_9935 ??
                    (visible_4846_209 && (
                        <Actionschevronright181
                            id="3001_9935"
                            className="Pixso-instance-3001_9935 pixso-relative-no-shrink"
                        ></Actionschevronright181>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyestypedefaultstatepressed;
