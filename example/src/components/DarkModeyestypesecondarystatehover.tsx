import Statusinfo180 from "@/components/Statusinfo180";
import Typebluedarkmodeyes from "@/components/Typebluedarkmodeyes";
import Actionschevronright181 from "@/components/Actionschevronright181";
import "@/styles/DarkModeyestypesecondarystatehover.css";
interface DarkModeyestypesecondarystatehoverProps {
    text_4846_0?: string;
    visible_4846_41?: boolean;
    visible_4846_83?: boolean;
    instance_4846_125?: string;
    visible_4846_167?: boolean;
    visible_4846_209?: boolean;
    instance_4846_251?: string;
    id?: string;
    className?: string;
    slot_3001_9886?: React.ReactNode;
    slot_3001_9887?: React.ReactNode;
    slot_3001_9888?: React.ReactNode;
    slot_3001_9889?: React.ReactNode;
}
const DarkModeyestypesecondarystatehover = (
    props: DarkModeyestypesecondarystatehoverProps
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
        slot_3001_9886,
        slot_3001_9887,
        slot_3001_9888,
        slot_3001_9889
    } = props;

    return (
        <div
            className={["component-3001_9884", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9884"
                className="Pixso-symbol-3001_9884 fill-darkbackgroundbg_1-3001_9761 pixso-relative-flex"
            >
                <div id="3001_9885" className="Pixso-rectangle-3001_9885"></div>
                {slot_3001_9886 ??
                    (visible_4846_83 && (
                        <Statusinfo180
                            id="3001_9886"
                            className="Pixso-instance-3001_9886 pixso-relative-no-shrink"
                        ></Statusinfo180>
                    ))}
                {slot_3001_9887 ??
                    (visible_4846_41 && (
                        <p
                            id="3001_9887"
                            className="Pixso-paragraph-3001_9887 fill-darksystemaccent_primary-3001_9755-paragraph text-bold16-3001_9753 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4846_0 ?? "Button"}
                        </p>
                    ))}
                {slot_3001_9888 ??
                    (visible_4846_167 && (
                        <Typebluedarkmodeyes
                            id="3001_9888"
                            className="Pixso-instance-3001_9888 pixso-relative-no-shrink"
                        ></Typebluedarkmodeyes>
                    ))}
                {slot_3001_9889 ??
                    (visible_4846_209 && (
                        <Actionschevronright181
                            id="3001_9889"
                            className="Pixso-instance-3001_9889 pixso-relative-no-shrink"
                        ></Actionschevronright181>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyestypesecondarystatehover;
