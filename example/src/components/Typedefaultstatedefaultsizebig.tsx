import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typedefaultsizebig from "@/components/Typedefaultsizebig";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typedefaultstatedefaultsizebig.css";
interface TypedefaultstatedefaultsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1129?: React.ReactNode;
    slot_1_1130?: React.ReactNode;
    slot_1_1131?: React.ReactNode;
    slot_1_1132?: React.ReactNode;
}
const Typedefaultstatedefaultsizebig = (
    props: TypedefaultstatedefaultsizebigProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1129,
        slot_1_1130,
        slot_1_1131,
        slot_1_1132
    } = props;

    return (
        <div
            className={["component-1_1128", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1128"
                className="Pixso-symbol-1_1128 pixso-relative-flex"
            >
                {slot_1_1129 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1129"
                            className="Pixso-instance-1_1129 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1130 ?? (
                    <p
                        id="1_1130"
                        className="Pixso-paragraph-1_1130 text-semibold16-1_10395 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1131 ??
                    (visible_4958_42 && (
                        <Typedefaultsizebig
                            id="1_1131"
                            className="Pixso-instance-1_1131 pixso-relative-no-shrink"
                        ></Typedefaultsizebig>
                    ))}
                {slot_1_1132 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1132"
                            className="Pixso-instance-1_1132 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typedefaultstatedefaultsizebig;
