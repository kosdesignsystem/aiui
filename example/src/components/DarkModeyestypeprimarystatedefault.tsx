import Statusinfo180 from "@/components/Statusinfo180";
import Typeonaccentdarkmodeyes from "@/components/Typeonaccentdarkmodeyes";
import Actionschevronright181 from "@/components/Actionschevronright181";
import "@/styles/DarkModeyestypeprimarystatedefault.css";
interface DarkModeyestypeprimarystatedefaultProps {
    text_4846_0?: string;
    visible_4846_41?: boolean;
    visible_4846_83?: boolean;
    instance_4846_125?: string;
    visible_4846_167?: boolean;
    visible_4846_209?: boolean;
    instance_4846_251?: string;
    id?: string;
    className?: string;
    slot_3001_9806?: React.ReactNode;
    slot_3001_9807?: React.ReactNode;
    slot_3001_9808?: React.ReactNode;
    slot_3001_9809?: React.ReactNode;
}
const DarkModeyestypeprimarystatedefault = (
    props: DarkModeyestypeprimarystatedefaultProps
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
        slot_3001_9806,
        slot_3001_9807,
        slot_3001_9808,
        slot_3001_9809
    } = props;

    return (
        <div
            className={["component-3001_9805", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9805"
                className="Pixso-symbol-3001_9805 fill-darksystemaccent_primary-3001_9755 pixso-relative-flex"
            >
                {slot_3001_9806 ??
                    (visible_4846_83 && (
                        <Statusinfo180
                            id="3001_9806"
                            className="Pixso-instance-3001_9806 pixso-relative-no-shrink"
                        ></Statusinfo180>
                    ))}
                {slot_3001_9807 ??
                    (visible_4846_41 && (
                        <p
                            id="3001_9807"
                            className="Pixso-paragraph-3001_9807 fill-darkcontent_on_accentprimary-3001_9756-paragraph text-bold16-3001_9753 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4846_0 ?? "Button"}
                        </p>
                    ))}
                {slot_3001_9808 ??
                    (visible_4846_167 && (
                        <Typeonaccentdarkmodeyes
                            id="3001_9808"
                            className="Pixso-instance-3001_9808 pixso-relative-no-shrink"
                        ></Typeonaccentdarkmodeyes>
                    ))}
                {slot_3001_9809 ??
                    (visible_4846_209 && (
                        <Actionschevronright181
                            id="3001_9809"
                            className="Pixso-instance-3001_9809 pixso-relative-no-shrink"
                        ></Actionschevronright181>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyestypeprimarystatedefault;
