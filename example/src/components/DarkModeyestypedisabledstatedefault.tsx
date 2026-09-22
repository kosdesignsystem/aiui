import Statusinfo180 from "@/components/Statusinfo180";
import Typedisabledarkmodeyes from "@/components/Typedisabledarkmodeyes";
import Actionschevronright181 from "@/components/Actionschevronright181";
import "@/styles/DarkModeyestypedisabledstatedefault.css";
interface DarkModeyestypedisabledstatedefaultProps {
    text_4846_0?: string;
    visible_4846_41?: boolean;
    visible_4846_83?: boolean;
    instance_4846_125?: string;
    visible_4846_167?: boolean;
    visible_4846_209?: boolean;
    instance_4846_251?: string;
    id?: string;
    className?: string;
    slot_3001_9942?: React.ReactNode;
    slot_3001_9943?: React.ReactNode;
    slot_3001_9944?: React.ReactNode;
    slot_3001_9945?: React.ReactNode;
}
const DarkModeyestypedisabledstatedefault = (
    props: DarkModeyestypedisabledstatedefaultProps
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
        slot_3001_9942,
        slot_3001_9943,
        slot_3001_9944,
        slot_3001_9945
    } = props;

    return (
        <div
            className={["component-3001_9941", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9941"
                className="Pixso-symbol-3001_9941 fill-darkbackgroundbg_1-3001_9761 pixso-relative-flex"
            >
                {slot_3001_9942 ??
                    (visible_4846_83 && (
                        <Statusinfo180
                            id="3001_9942"
                            className="Pixso-instance-3001_9942 pixso-relative-no-shrink"
                        ></Statusinfo180>
                    ))}
                {slot_3001_9943 ??
                    (visible_4846_41 && (
                        <p
                            id="3001_9943"
                            className="Pixso-paragraph-3001_9943 fill-darkcontentdisabled-3001_9767-paragraph text-bold16-3001_9753 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4846_0 ?? "Button"}
                        </p>
                    ))}
                {slot_3001_9944 ??
                    (visible_4846_167 && (
                        <Typedisabledarkmodeyes
                            id="3001_9944"
                            className="Pixso-instance-3001_9944 pixso-relative-no-shrink"
                        ></Typedisabledarkmodeyes>
                    ))}
                {slot_3001_9945 ??
                    (visible_4846_209 && (
                        <Actionschevronright181
                            id="3001_9945"
                            className="Pixso-instance-3001_9945 pixso-relative-no-shrink"
                        ></Actionschevronright181>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyestypedisabledstatedefault;
