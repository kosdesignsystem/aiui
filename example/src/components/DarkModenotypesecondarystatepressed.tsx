import Statusinfo180 from "@/components/Statusinfo180";
import Typebluedarkmodeno from "@/components/Typebluedarkmodeno";
import Actionschevronright181 from "@/components/Actionschevronright181";
import "@/styles/DarkModenotypesecondarystatepressed.css";
interface DarkModenotypesecondarystatepressedProps {
    text_4846_0?: string;
    visible_4846_41?: boolean;
    visible_4846_83?: boolean;
    instance_4846_125?: string;
    visible_4846_167?: boolean;
    visible_4846_209?: boolean;
    instance_4846_251?: string;
    id?: string;
    className?: string;
    slot_3001_9892?: React.ReactNode;
    slot_3001_9893?: React.ReactNode;
    slot_3001_9894?: React.ReactNode;
    slot_3001_9895?: React.ReactNode;
}
const DarkModenotypesecondarystatepressed = (
    props: DarkModenotypesecondarystatepressedProps
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
        slot_3001_9892,
        slot_3001_9893,
        slot_3001_9894,
        slot_3001_9895
    } = props;

    return (
        <div
            className={["component-3001_9890", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9890"
                className="Pixso-symbol-3001_9890 fill-lightbackgroundbg_1-3001_9760 pixso-relative-flex"
            >
                <div id="3001_9891" className="Pixso-rectangle-3001_9891"></div>
                {slot_3001_9892 ??
                    (visible_4846_83 && (
                        <Statusinfo180
                            id="3001_9892"
                            className="Pixso-instance-3001_9892 pixso-relative-no-shrink"
                        ></Statusinfo180>
                    ))}
                {slot_3001_9893 ??
                    (visible_4846_41 && (
                        <p
                            id="3001_9893"
                            className="Pixso-paragraph-3001_9893 fill-lightsystemaccent_primary-3001_9751-paragraph text-bold16-3001_9753 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4846_0 ?? "Button"}
                        </p>
                    ))}
                {slot_3001_9894 ??
                    (visible_4846_167 && (
                        <Typebluedarkmodeno
                            id="3001_9894"
                            className="Pixso-instance-3001_9894 pixso-relative-no-shrink"
                        ></Typebluedarkmodeno>
                    ))}
                {slot_3001_9895 ??
                    (visible_4846_209 && (
                        <Actionschevronright181
                            id="3001_9895"
                            className="Pixso-instance-3001_9895 pixso-relative-no-shrink"
                        ></Actionschevronright181>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenotypesecondarystatepressed;
