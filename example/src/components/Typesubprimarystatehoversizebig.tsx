import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeaccentsizebig from "@/components/Typeaccentsizebig";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typesubprimarystatehoversizebig.css";
interface TypesubprimarystatehoversizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1099?: React.ReactNode;
    slot_1_1100?: React.ReactNode;
    slot_1_1101?: React.ReactNode;
    slot_1_1102?: React.ReactNode;
}
const Typesubprimarystatehoversizebig = (
    props: TypesubprimarystatehoversizebigProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1099,
        slot_1_1100,
        slot_1_1101,
        slot_1_1102
    } = props;

    return (
        <div
            className={["component-1_1098", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1098"
                className="Pixso-symbol-1_1098 pixso-relative-flex"
            >
                {slot_1_1099 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1099"
                            className="Pixso-instance-1_1099 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1100 ?? (
                    <p
                        id="1_1100"
                        className="Pixso-paragraph-1_1100 text-semibold16-1_10395 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1101 ??
                    (visible_4958_42 && (
                        <Typeaccentsizebig
                            id="1_1101"
                            className="Pixso-instance-1_1101 pixso-relative-no-shrink"
                        ></Typeaccentsizebig>
                    ))}
                {slot_1_1102 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1102"
                            className="Pixso-instance-1_1102 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typesubprimarystatehoversizebig;
