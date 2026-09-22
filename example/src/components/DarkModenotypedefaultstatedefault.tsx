import Statusinfo180 from "@/components/Statusinfo180";
import Typewhitedarkmodeno from "@/components/Typewhitedarkmodeno";
import Actionschevronright181 from "@/components/Actionschevronright181";
import "@/styles/DarkModenotypedefaultstatedefault.css";
interface DarkModenotypedefaultstatedefaultProps {
    text_4846_0?: string;
    visible_4846_41?: boolean;
    visible_4846_83?: boolean;
    instance_4846_125?: string;
    visible_4846_167?: boolean;
    visible_4846_209?: boolean;
    instance_4846_251?: string;
    id?: string;
    className?: string;
    slot_3001_9903?: React.ReactNode;
    slot_3001_9904?: React.ReactNode;
    slot_3001_9905?: React.ReactNode;
    slot_3001_9906?: React.ReactNode;
}
const DarkModenotypedefaultstatedefault = (
    props: DarkModenotypedefaultstatedefaultProps
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
        slot_3001_9903,
        slot_3001_9904,
        slot_3001_9905,
        slot_3001_9906
    } = props;

    return (
        <div
            className={["component-3001_9902", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9902"
                className="Pixso-symbol-3001_9902 pixso-relative-flex"
            >
                {slot_3001_9903 ??
                    (visible_4846_83 && (
                        <Statusinfo180
                            id="3001_9903"
                            className="Pixso-instance-3001_9903 pixso-relative-no-shrink"
                        ></Statusinfo180>
                    ))}
                {slot_3001_9904 ??
                    (visible_4846_41 && (
                        <p
                            id="3001_9904"
                            className="Pixso-paragraph-3001_9904 fill-lightcontentprimary-1_10500-paragraph text-bold16-3001_9753 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {text_4846_0 ?? "Button"}
                        </p>
                    ))}
                {slot_3001_9905 ??
                    (visible_4846_167 && (
                        <Typewhitedarkmodeno
                            id="3001_9905"
                            className="Pixso-instance-3001_9905 pixso-relative-no-shrink"
                        ></Typewhitedarkmodeno>
                    ))}
                {slot_3001_9906 ??
                    (visible_4846_209 && (
                        <Actionschevronright181
                            id="3001_9906"
                            className="Pixso-instance-3001_9906 pixso-relative-no-shrink"
                        ></Actionschevronright181>
                    ))}
            </div>
        </div>
    );
};
export default DarkModenotypedefaultstatedefault;
