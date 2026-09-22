import Isoutlinetrue19 from "@/components/Isoutlinetrue19";
import Darkmodenothemepurpletypeaccentsizesmall from "@/components/Darkmodenothemepurpletypeaccentsizesmall";
import Actionschevronright212 from "@/components/Actionschevronright212";
import "@/styles/DarkModenothemepurpletypesecondarystatepressedsizesmall.css";
interface DarkModenothemepurpletypesecondarystatepressedsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    instance_4958_126?: string;
    instance_4958_168?: string;
    text_4958_210?: string;
    visible_4958_252?: boolean;
    id?: string;
    className?: string;
    slot_1_26620?: React.ReactNode;
    slot_1_26621?: React.ReactNode;
    slot_1_26622?: React.ReactNode;
    slot_1_26623?: React.ReactNode;
}
const DarkModenothemepurpletypesecondarystatepressedsizesmall = (
    props: DarkModenothemepurpletypesecondarystatepressedsizesmallProps
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
        slot_1_26620,
        slot_1_26621,
        slot_1_26622,
        slot_1_26623
    } = props;

    return (
        <div
            className={["component-1_26619", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26619"
                className="Pixso-symbol-1_26619 fill-light-default_primary-pressed-1_10480 pixso-relative-flex"
            >
                {slot_1_26620 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue19
                            id="1_26620"
                            className="Pixso-instance-1_26620 pixso-relative-no-shrink"
                        ></Isoutlinetrue19>
                    ))}
                {slot_1_26621 ??
                    (visible_4958_252 && (
                        <p
                            id="1_26621"
                            className="Pixso-paragraph-1_26621 fill-light_contentprimary-1_10528-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4958_210 ?? "Button"}
                        </p>
                    ))}
                {slot_1_26622 ??
                    (visible_4958_42 && (
                        <Darkmodenothemepurpletypeaccentsizesmall
                            id="1_26622"
                            className="Pixso-instance-1_26622 pixso-relative-no-shrink"
                        ></Darkmodenothemepurpletypeaccentsizesmall>
                    ))}
                {slot_1_26623 ??
                    (visible_4958_84 && (
                        <Actionschevronright212
                            id="1_26623"
                            className="Pixso-instance-1_26623 pixso-relative-no-shrink"
                        ></Actionschevronright212>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenothemepurpletypesecondarystatepressedsizesmall;
