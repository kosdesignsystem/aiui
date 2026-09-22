import Statusinfo180 from "@/components/Statusinfo180";
import Typebluedarkmodeyes from "@/components/Typebluedarkmodeyes";
import Actionschevronright181 from "@/components/Actionschevronright181";
import "@/styles/DarkModeyestypesecondarystatedefault.css";
interface DarkModeyestypesecondarystatedefaultProps {
    text_4846_0?: string;
    visible_4846_41?: boolean;
    visible_4846_83?: boolean;
    instance_4846_125?: string;
    visible_4846_167?: boolean;
    visible_4846_209?: boolean;
    instance_4846_251?: string;
    id?: string;
    className?: string;
    slot_3001_9874?: React.ReactNode;
    slot_3001_9875?: React.ReactNode;
    slot_3001_9876?: React.ReactNode;
    slot_3001_9877?: React.ReactNode;
}
const DarkModeyestypesecondarystatedefault = (
    props: DarkModeyestypesecondarystatedefaultProps
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
        slot_3001_9874,
        slot_3001_9875,
        slot_3001_9876,
        slot_3001_9877
    } = props;

    return (
        <div
            className={["component-3001_9873", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9873"
                className="Pixso-symbol-3001_9873 fill-darkbackgroundbg_1-3001_9761 pixso-relative-flex"
            >
                {slot_3001_9874 ??
                    (visible_4846_83 && (
                        <Statusinfo180
                            id="3001_9874"
                            className="Pixso-instance-3001_9874 pixso-relative-no-shrink"
                        ></Statusinfo180>
                    ))}
                {slot_3001_9875 ??
                    (visible_4846_41 && (
                        <p
                            id="3001_9875"
                            className="Pixso-paragraph-3001_9875 fill-darksystemaccent_primary-3001_9755-paragraph text-bold16-3001_9753 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4846_0 ?? "Button"}
                        </p>
                    ))}
                {slot_3001_9876 ??
                    (visible_4846_167 && (
                        <Typebluedarkmodeyes
                            id="3001_9876"
                            className="Pixso-instance-3001_9876 pixso-relative-no-shrink"
                        ></Typebluedarkmodeyes>
                    ))}
                {slot_3001_9877 ??
                    (visible_4846_209 && (
                        <Actionschevronright181
                            id="3001_9877"
                            className="Pixso-instance-3001_9877 pixso-relative-no-shrink"
                        ></Actionschevronright181>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyestypesecondarystatedefault;
