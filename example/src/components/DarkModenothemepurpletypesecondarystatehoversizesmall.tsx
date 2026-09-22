import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemepurpletypeaccentsizesmall from "@/components/Darkmodenothemepurpletypeaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemepurpletypesecondarystatehoversizesmall.css";
interface DarkModenothemepurpletypesecondarystatehoversizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26615?: React.ReactNode;
    slot_1_26616?: React.ReactNode;
    slot_1_26617?: React.ReactNode;
    slot_1_26618?: React.ReactNode;
}
const DarkModenothemepurpletypesecondarystatehoversizesmall = (
    props: DarkModenothemepurpletypesecondarystatehoversizesmallProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        instance_4958_126 = "Component_1_26999",
        instance_4958_168 = "Component_1_26822",
        text_4958_210 = "Button",
        visible_4958_252 = true,
        id,
        className = "",
        slot_1_26615,
        slot_1_26616,
        slot_1_26617,
        slot_1_26618
    } = props;

    return (
        <div
            className={["component-1_26614", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26614"
                className="Pixso-symbol-1_26614 fill-light-default_primary-hover-1_10478 pixso-relative-flex"
            >
                {slot_1_26615 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26615"
                            className="Pixso-instance-1_26615 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26616 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26616"
                            className="Pixso-paragraph-1_26616 fill-light_contentprimary-1_10528-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26617 ??
                    (visible_4958_42 && (
                        <Darkmodenothemepurpletypeaccentsizesmall
                            id="1_26617"
                            className="Pixso-instance-1_26617 pixso-relative-no-shrink"
                        ></Darkmodenothemepurpletypeaccentsizesmall>
                    ))}
                {slot_1_26618 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26618"
                            className="Pixso-instance-1_26618 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypesecondarystatehoversizesmall;
