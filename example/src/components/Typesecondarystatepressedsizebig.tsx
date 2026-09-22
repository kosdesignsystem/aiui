import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeaccentsizebig from "@/components/Typeaccentsizebig";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typesecondarystatepressedsizebig.css";
interface TypesecondarystatepressedsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1124?: React.ReactNode;
    slot_1_1125?: React.ReactNode;
    slot_1_1126?: React.ReactNode;
    slot_1_1127?: React.ReactNode;
}
const Typesecondarystatepressedsizebig = (
    props: TypesecondarystatepressedsizebigProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1124,
        slot_1_1125,
        slot_1_1126,
        slot_1_1127
    } = props;

    return (
        <div
            className={["component-1_1123", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1123"
                className="Pixso-symbol-1_1123 pixso-relative-flex"
            >
                {slot_1_1124 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1124"
                            className="Pixso-instance-1_1124 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1125 ?? (
                    <p
                        id="1_1125"
                        className="Pixso-paragraph-1_1125 text-semibold16-1_10395 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1126 ??
                    (visible_4958_42 && (
                        <Typeaccentsizebig
                            id="1_1126"
                            className="Pixso-instance-1_1126 pixso-relative-no-shrink"
                        ></Typeaccentsizebig>
                    ))}
                {slot_1_1127 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1127"
                            className="Pixso-instance-1_1127 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typesecondarystatepressedsizebig;
