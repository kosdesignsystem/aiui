import Statusinfo180 from "@/components/Statusinfo180";
import Typedisabledarkmodeno from "@/components/Typedisabledarkmodeno";
import Actionschevronright181 from "@/components/Actionschevronright181";
import "@/styles/DarkModenotypedisabledstatepressed.css";
interface DarkModenotypedisabledstatepressedProps {
    text_4846_0?: string;
    visible_4846_41?: boolean;
    visible_4846_83?: boolean;
    instance_4846_125?: string;
    visible_4846_167?: boolean;
    visible_4846_209?: boolean;
    instance_4846_251?: string;
    id?: string;
    className?: string;
    slot_3001_9957?: React.ReactNode;
    slot_3001_9958?: React.ReactNode;
    slot_3001_9959?: React.ReactNode;
    slot_3001_9960?: React.ReactNode;
}
const DarkModenotypedisabledstatepressed = (
    props: DarkModenotypedisabledstatepressedProps
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
        slot_3001_9957,
        slot_3001_9958,
        slot_3001_9959,
        slot_3001_9960
    } = props;

    return (
        <div
            className={["component-3001_9956", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9956"
                className="Pixso-symbol-3001_9956 fill-lightbackgroundbg_1-3001_9760 pixso-relative-flex"
            >
                {slot_3001_9957 ??
                    (visible_4846_83 && (
                        <Statusinfo180
                            id="3001_9957"
                            className="Pixso-instance-3001_9957 pixso-relative-no-shrink"
                        ></Statusinfo180>
                    ))}
                {slot_3001_9958 ??
                    (visible_4846_41 && (
                        <p
                            id="3001_9958"
                            className="Pixso-paragraph-3001_9958 fill-lightcontentdisabled-3001_9765-paragraph text-bold16-3001_9753 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4846_0 ?? "Button"}
                        </p>
                    ))}
                {slot_3001_9959 ??
                    (visible_4846_167 && (
                        <Typedisabledarkmodeno
                            id="3001_9959"
                            className="Pixso-instance-3001_9959 pixso-relative-no-shrink"
                        ></Typedisabledarkmodeno>
                    ))}
                {slot_3001_9960 ??
                    (visible_4846_209 && (
                        <Actionschevronright181
                            id="3001_9960"
                            className="Pixso-instance-3001_9960 pixso-relative-no-shrink"
                        ></Actionschevronright181>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenotypedisabledstatepressed;
