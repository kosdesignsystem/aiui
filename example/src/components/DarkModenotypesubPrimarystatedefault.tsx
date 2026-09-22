import Statusinfo180 from "@/components/Statusinfo180";
import Typebluedarkmodeno from "@/components/Typebluedarkmodeno";
import Actionschevronright181 from "@/components/Actionschevronright181";
import "@/styles/DarkModenotypesubPrimarystatedefault.css";
interface DarkModenotypesubPrimarystatedefaultProps {
    text_4846_0?: string;
    visible_4846_41?: boolean;
    visible_4846_83?: boolean;
    instance_4846_125?: string;
    visible_4846_167?: boolean;
    visible_4846_209?: boolean;
    instance_4846_251?: string;
    id?: string;
    className?: string;
    slot_3001_9835?: React.ReactNode;
    slot_3001_9836?: React.ReactNode;
    slot_3001_9837?: React.ReactNode;
    slot_3001_9838?: React.ReactNode;
}
const DarkModenotypesubPrimarystatedefault = (
    props: DarkModenotypesubPrimarystatedefaultProps
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
        slot_3001_9835,
        slot_3001_9836,
        slot_3001_9837,
        slot_3001_9838
    } = props;

    return (
        <div
            className={["component-3001_9834", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9834"
                className="Pixso-symbol-3001_9834 fill-lightsystemaccent_secondary-3001_9797 pixso-relative-flex"
            >
                {slot_3001_9835 ??
                    (visible_4846_83 && (
                        <Statusinfo180
                            id="3001_9835"
                            className="Pixso-instance-3001_9835 pixso-relative-no-shrink"
                        ></Statusinfo180>
                    ))}
                {slot_3001_9836 ??
                    (visible_4846_41 && (
                        <p
                            id="3001_9836"
                            className="Pixso-paragraph-3001_9836 fill-lightsystemaccent_primary-3001_9751-paragraph text-bold16-3001_9753 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4846_0 ?? "Button"}
                        </p>
                    ))}
                {slot_3001_9837 ??
                    (visible_4846_167 && (
                        <Typebluedarkmodeno
                            id="3001_9837"
                            className="Pixso-instance-3001_9837 pixso-relative-no-shrink"
                        ></Typebluedarkmodeno>
                    ))}
                {slot_3001_9838 ??
                    (visible_4846_209 && (
                        <Actionschevronright181
                            id="3001_9838"
                            className="Pixso-instance-3001_9838 pixso-relative-no-shrink"
                        ></Actionschevronright181>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenotypesubPrimarystatedefault;
