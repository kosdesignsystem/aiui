import Statusinfo180 from "@/components/Statusinfo180";
import Typewhitedarkmodeyes from "@/components/Typewhitedarkmodeyes";
import Actionschevronright181 from "@/components/Actionschevronright181";
import "@/styles/DarkModeyestypedefaultstatedefault.css";
interface DarkModeyestypedefaultstatedefaultProps {
    text_4846_0?: string;
    visible_4846_41?: boolean;
    visible_4846_83?: boolean;
    instance_4846_125?: string;
    visible_4846_167?: boolean;
    visible_4846_209?: boolean;
    instance_4846_251?: string;
    id?: string;
    className?: string;
    slot_3001_9908?: React.ReactNode;
    slot_3001_9909?: React.ReactNode;
    slot_3001_9910?: React.ReactNode;
    slot_3001_9911?: React.ReactNode;
}
const DarkModeyestypedefaultstatedefault = (
    props: DarkModeyestypedefaultstatedefaultProps
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
        slot_3001_9908,
        slot_3001_9909,
        slot_3001_9910,
        slot_3001_9911
    } = props;

    return (
        <div
            className={["component-3001_9907", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9907"
                className="Pixso-symbol-3001_9907 pixso-relative-flex"
            >
                {slot_3001_9908 ??
                    (visible_4846_83 && (
                        <Statusinfo180
                            id="3001_9908"
                            className="Pixso-instance-3001_9908 pixso-relative-no-shrink"
                        ></Statusinfo180>
                    ))}
                {slot_3001_9909 ??
                    (visible_4846_41 && (
                        <p
                            id="3001_9909"
                            className="Pixso-paragraph-3001_9909 fill-darkcontentprimary-1_10409-paragraph text-bold16-3001_9753 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4846_0 ?? "Button"}
                        </p>
                    ))}
                {slot_3001_9910 ??
                    (visible_4846_167 && (
                        <Typewhitedarkmodeyes
                            id="3001_9910"
                            className="Pixso-instance-3001_9910 pixso-relative-no-shrink"
                        ></Typewhitedarkmodeyes>
                    ))}
                {slot_3001_9911 ??
                    (visible_4846_209 && (
                        <Actionschevronright181
                            id="3001_9911"
                            className="Pixso-instance-3001_9911 pixso-relative-no-shrink"
                        ></Actionschevronright181>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyestypedefaultstatedefault;
