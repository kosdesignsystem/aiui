import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemegreentypedefaultsizesmall from "@/components/Darkmodeyesthemegreentypedefaultsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemegreentypedefaultstatepressedsizesmall.css";
interface DarkModeyesthemegreentypedefaultstatepressedsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26695?: React.ReactNode;
    slot_1_26696?: React.ReactNode;
    slot_1_26697?: React.ReactNode;
    slot_1_26698?: React.ReactNode;
}
const DarkModeyesthemegreentypedefaultstatepressedsizesmall = (
    props: DarkModeyesthemegreentypedefaultstatepressedsizesmallProps
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
        slot_1_26695,
        slot_1_26696,
        slot_1_26697,
        slot_1_26698
    } = props;

    return (
        <div
            className={["component-1_26694", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26694"
                className="Pixso-symbol-1_26694 fill-dark-default_secondary-pressed-1_10485 pixso-relative-flex"
            >
                {slot_1_26695 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26695"
                            className="Pixso-instance-1_26695 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26696 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26696"
                            className="Pixso-paragraph-1_26696 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26697 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemegreentypedefaultsizesmall
                            id="1_26697"
                            className="Pixso-instance-1_26697 pixso-relative-no-shrink"
                        ></Darkmodeyesthemegreentypedefaultsizesmall>
                    ))}
                {slot_1_26698 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26698"
                            className="Pixso-instance-1_26698 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypedefaultstatepressedsizesmall;
