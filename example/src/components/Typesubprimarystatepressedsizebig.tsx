import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeaccentsizebig from "@/components/Typeaccentsizebig";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typesubprimarystatepressedsizebig.css";
interface TypesubprimarystatepressedsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1104?: React.ReactNode;
    slot_1_1105?: React.ReactNode;
    slot_1_1106?: React.ReactNode;
    slot_1_1107?: React.ReactNode;
}
const Typesubprimarystatepressedsizebig = (
    props: TypesubprimarystatepressedsizebigProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1104,
        slot_1_1105,
        slot_1_1106,
        slot_1_1107
    } = props;

    return (
        <div
            className={["component-1_1103", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1103"
                className="Pixso-symbol-1_1103 pixso-relative-flex"
            >
                {slot_1_1104 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1104"
                            className="Pixso-instance-1_1104 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1105 ?? (
                    <p
                        id="1_1105"
                        className="Pixso-paragraph-1_1105 text-semibold16-1_10395 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1106 ??
                    (visible_4958_42 && (
                        <Typeaccentsizebig
                            id="1_1106"
                            className="Pixso-instance-1_1106 pixso-relative-no-shrink"
                        ></Typeaccentsizebig>
                    ))}
                {slot_1_1107 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1107"
                            className="Pixso-instance-1_1107 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typesubprimarystatepressedsizebig;
