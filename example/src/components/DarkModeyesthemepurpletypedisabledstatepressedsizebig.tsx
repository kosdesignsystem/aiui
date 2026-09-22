import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodeyesthemepurpletypedisablesizebig from "@/components/Darkmodeyesthemepurpletypedisablesizebig";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModeyesthemepurpletypedisabledstatepressedsizebig.css";
interface DarkModeyesthemepurpletypedisabledstatepressedsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26365?: React.ReactNode;
    slot_1_26366?: React.ReactNode;
    slot_1_26367?: React.ReactNode;
    slot_1_26368?: React.ReactNode;
}
const DarkModeyesthemepurpletypedisabledstatepressedsizebig = (
    props: DarkModeyesthemepurpletypedisabledstatepressedsizebigProps
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
        slot_1_26365,
        slot_1_26366,
        slot_1_26367,
        slot_1_26368
    } = props;

    return (
        <div
            className={["component-1_26364", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26364"
                className="Pixso-symbol-1_26364 fill-dark_contentplashka-1_30095 pixso-relative-flex"
            >
                {slot_1_26365 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26365"
                            className="Pixso-instance-1_26365 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26366 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26366"
                            className="Pixso-paragraph-1_26366 fill-dark_contentdisabled-1_30129-paragraph text-semibold16-1_30119 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26367 ??
                    (visible_4958_42 && (
                        <Darkmodeyesthemepurpletypedisablesizebig
                            id="1_26367"
                            className="Pixso-instance-1_26367 pixso-relative-no-shrink"
                        ></Darkmodeyesthemepurpletypedisablesizebig>
                    ))}
                {slot_1_26368 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26368"
                            className="Pixso-instance-1_26368 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModeyesthemepurpletypedisabledstatepressedsizebig;
