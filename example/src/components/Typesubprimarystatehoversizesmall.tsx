import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeaccentsizesmall from "@/components/Typeaccentsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typesubprimarystatehoversizesmall.css";
interface TypesubprimarystatehoversizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1234?: React.ReactNode;
    slot_1_1235?: React.ReactNode;
    slot_1_1236?: React.ReactNode;
    slot_1_1237?: React.ReactNode;
}
const Typesubprimarystatehoversizesmall = (
    props: TypesubprimarystatehoversizesmallProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1234,
        slot_1_1235,
        slot_1_1236,
        slot_1_1237
    } = props;

    return (
        <div
            className={["component-1_1233", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1233"
                className="Pixso-symbol-1_1233 pixso-relative-flex"
            >
                {slot_1_1234 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1234"
                            className="Pixso-instance-1_1234 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1235 ?? (
                    <p
                        id="1_1235"
                        className="Pixso-paragraph-1_1235 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1236 ??
                    (visible_4958_42 && (
                        <Typeaccentsizesmall
                            id="1_1236"
                            className="Pixso-instance-1_1236 pixso-relative-no-shrink"
                        ></Typeaccentsizesmall>
                    ))}
                {slot_1_1237 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1237"
                            className="Pixso-instance-1_1237 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typesubprimarystatehoversizesmall;
