import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typedefaultsizebig from "@/components/Typedefaultsizebig";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typedefaultstatehoversizebig.css";
interface TypedefaultstatehoversizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1139?: React.ReactNode;
    slot_1_1140?: React.ReactNode;
    slot_1_1141?: React.ReactNode;
    slot_1_1142?: React.ReactNode;
}
const Typedefaultstatehoversizebig = (
    props: TypedefaultstatehoversizebigProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1139,
        slot_1_1140,
        slot_1_1141,
        slot_1_1142
    } = props;

    return (
        <div
            className={["component-1_1138", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1138"
                className="Pixso-symbol-1_1138 pixso-relative-flex"
            >
                {slot_1_1139 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1139"
                            className="Pixso-instance-1_1139 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1140 ?? (
                    <p
                        id="1_1140"
                        className="Pixso-paragraph-1_1140 text-semibold16-1_10395 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1141 ??
                    (visible_4958_42 && (
                        <Typedefaultsizebig
                            id="1_1141"
                            className="Pixso-instance-1_1141 pixso-relative-no-shrink"
                        ></Typedefaultsizebig>
                    ))}
                {slot_1_1142 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1142"
                            className="Pixso-instance-1_1142 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typedefaultstatehoversizebig;
