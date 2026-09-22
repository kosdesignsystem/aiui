import Statusinfo180 from "@/components/Statusinfo180";
import Typeonaccentdarkmodeno from "@/components/Typeonaccentdarkmodeno";
import Actionschevronright181 from "@/components/Actionschevronright181";
import "@/styles/DarkModenotypeprimarystatedefault.css";
interface DarkModenotypeprimarystatedefaultProps {
    text_4846_0?: string;
    visible_4846_41?: boolean;
    visible_4846_83?: boolean;
    instance_4846_125?: string;
    visible_4846_167?: boolean;
    visible_4846_209?: boolean;
    instance_4846_251?: string;
    id?: string;
    className?: string;
    slot_3001_9801?: React.ReactNode;
    slot_3001_9802?: React.ReactNode;
    slot_3001_9803?: React.ReactNode;
    slot_3001_9804?: React.ReactNode;
}
const DarkModenotypeprimarystatedefault = (
    props: DarkModenotypeprimarystatedefaultProps
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
        slot_3001_9801,
        slot_3001_9802,
        slot_3001_9803,
        slot_3001_9804
    } = props;

    return (
        <div
            className={["component-3001_9800", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9800"
                className="Pixso-symbol-3001_9800 fill-lightsystemaccent_primary-3001_9751 pixso-relative-flex"
            >
                {slot_3001_9801 ??
                    (visible_4846_83 && (
                        <Statusinfo180
                            id="3001_9801"
                            className="Pixso-instance-3001_9801 pixso-relative-no-shrink"
                        ></Statusinfo180>
                    ))}
                {slot_3001_9802 ??
                    (visible_4846_41 && (
                        <p
                            id="3001_9802"
                            className="Pixso-paragraph-3001_9802 fill-lightcontent_on_accentprimary-3001_9752-paragraph text-bold16-3001_9753 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4846_0 ?? "Button"}
                        </p>
                    ))}
                {slot_3001_9803 ??
                    (visible_4846_167 && (
                        <Typeonaccentdarkmodeno
                            id="3001_9803"
                            className="Pixso-instance-3001_9803 pixso-relative-no-shrink"
                        ></Typeonaccentdarkmodeno>
                    ))}
                {slot_3001_9804 ??
                    (visible_4846_209 && (
                        <Actionschevronright181
                            id="3001_9804"
                            className="Pixso-instance-3001_9804 pixso-relative-no-shrink"
                        ></Actionschevronright181>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenotypeprimarystatedefault;
