import Statusinfo180 from "@/components/Statusinfo180";
import Typeonaccentdarkmodeno from "@/components/Typeonaccentdarkmodeno";
import Actionschevronright181 from "@/components/Actionschevronright181";
import "@/styles/DarkModenotypeprimarystatehover.css";
interface DarkModenotypeprimarystatehoverProps {
    text_4846_0?: string;
    visible_4846_41?: boolean;
    visible_4846_83?: boolean;
    instance_4846_125?: string;
    visible_4846_167?: boolean;
    visible_4846_209?: boolean;
    instance_4846_251?: string;
    id?: string;
    className?: string;
    slot_3001_9812?: React.ReactNode;
    slot_3001_9813?: React.ReactNode;
    slot_3001_9814?: React.ReactNode;
    slot_3001_9815?: React.ReactNode;
}
const DarkModenotypeprimarystatehover = (
    props: DarkModenotypeprimarystatehoverProps
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
        slot_3001_9812,
        slot_3001_9813,
        slot_3001_9814,
        slot_3001_9815
    } = props;

    return (
        <div
            className={["component-3001_9810", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9810"
                className="Pixso-symbol-3001_9810 fill-lightsystemaccent_primary-3001_9751 pixso-relative-flex"
            >
                <div id="3001_9811" className="Pixso-rectangle-3001_9811"></div>
                {slot_3001_9812 ??
                    (visible_4846_83 && (
                        <Statusinfo180
                            id="3001_9812"
                            className="Pixso-instance-3001_9812 pixso-relative-no-shrink"
                        ></Statusinfo180>
                    ))}
                {slot_3001_9813 ??
                    (visible_4846_41 && (
                        <p
                            id="3001_9813"
                            className="Pixso-paragraph-3001_9813 fill-lightcontent_on_accentprimary-3001_9752-paragraph text-bold16-3001_9753 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4846_0 ?? "Button"}
                        </p>
                    ))}
                {slot_3001_9814 ??
                    (visible_4846_167 && (
                        <Typeonaccentdarkmodeno
                            id="3001_9814"
                            className="Pixso-instance-3001_9814 pixso-relative-no-shrink"
                        ></Typeonaccentdarkmodeno>
                    ))}
                {slot_3001_9815 ??
                    (visible_4846_209 && (
                        <Actionschevronright181
                            id="3001_9815"
                            className="Pixso-instance-3001_9815 pixso-relative-no-shrink"
                        ></Actionschevronright181>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenotypeprimarystatehover;
