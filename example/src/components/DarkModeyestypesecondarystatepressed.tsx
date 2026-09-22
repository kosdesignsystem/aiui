import Statusinfo180 from "@/components/Statusinfo180";
import Typebluedarkmodeyes from "@/components/Typebluedarkmodeyes";
import Actionschevronright181 from "@/components/Actionschevronright181";
import "@/styles/DarkModeyestypesecondarystatepressed.css";
interface DarkModeyestypesecondarystatepressedProps {
    text_4846_0?: string;
    visible_4846_41?: boolean;
    visible_4846_83?: boolean;
    instance_4846_125?: string;
    visible_4846_167?: boolean;
    visible_4846_209?: boolean;
    instance_4846_251?: string;
    id?: string;
    className?: string;
    slot_3001_9898?: React.ReactNode;
    slot_3001_9899?: React.ReactNode;
    slot_3001_9900?: React.ReactNode;
    slot_3001_9901?: React.ReactNode;
}
const DarkModeyestypesecondarystatepressed = (
    props: DarkModeyestypesecondarystatepressedProps
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
        slot_3001_9898,
        slot_3001_9899,
        slot_3001_9900,
        slot_3001_9901
    } = props;

    return (
        <div
            className={["component-3001_9896", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9896"
                className="Pixso-symbol-3001_9896 fill-darkbackgroundbg_1-3001_9761 pixso-relative-flex"
            >
                <div id="3001_9897" className="Pixso-rectangle-3001_9897"></div>
                {slot_3001_9898 ??
                    (visible_4846_83 && (
                        <Statusinfo180
                            id="3001_9898"
                            className="Pixso-instance-3001_9898 pixso-relative-no-shrink"
                        ></Statusinfo180>
                    ))}
                {slot_3001_9899 ??
                    (visible_4846_41 && (
                        <p
                            id="3001_9899"
                            className="Pixso-paragraph-3001_9899 fill-darksystemaccent_primary-3001_9755-paragraph text-bold16-3001_9753 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4846_0 ?? "Button"}
                        </p>
                    ))}
                {slot_3001_9900 ??
                    (visible_4846_167 && (
                        <Typebluedarkmodeyes
                            id="3001_9900"
                            className="Pixso-instance-3001_9900 pixso-relative-no-shrink"
                        ></Typebluedarkmodeyes>
                    ))}
                {slot_3001_9901 ??
                    (visible_4846_209 && (
                        <Actionschevronright181
                            id="3001_9901"
                            className="Pixso-instance-3001_9901 pixso-relative-no-shrink"
                        ></Actionschevronright181>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyestypesecondarystatepressed;
