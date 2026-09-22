import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeonaccentsizebig from "@/components/Typeonaccentsizebig";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typeprimarystatehoversizebig.css";
interface TypeprimarystatehoversizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1079?: React.ReactNode;
    slot_1_1080?: React.ReactNode;
    slot_1_1081?: React.ReactNode;
    slot_1_1082?: React.ReactNode;
}
const Typeprimarystatehoversizebig = (
    props: TypeprimarystatehoversizebigProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1079,
        slot_1_1080,
        slot_1_1081,
        slot_1_1082
    } = props;

    return (
        <div
            className={["component-1_1078", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1078"
                className="Pixso-symbol-1_1078 pixso-relative-flex"
            >
                {slot_1_1079 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1079"
                            className="Pixso-instance-1_1079 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1080 ?? (
                    <p
                        id="1_1080"
                        className="Pixso-paragraph-1_1080 text-semibold16-1_10395 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1081 ??
                    (visible_4958_42 && (
                        <Typeonaccentsizebig
                            id="1_1081"
                            className="Pixso-instance-1_1081 pixso-relative-no-shrink"
                        ></Typeonaccentsizebig>
                    ))}
                {slot_1_1082 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1082"
                            className="Pixso-instance-1_1082 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typeprimarystatehoversizebig;
