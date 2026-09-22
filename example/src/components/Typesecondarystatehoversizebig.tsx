import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeaccentsizebig from "@/components/Typeaccentsizebig";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typesecondarystatehoversizebig.css";
interface TypesecondarystatehoversizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1119?: React.ReactNode;
    slot_1_1120?: React.ReactNode;
    slot_1_1121?: React.ReactNode;
    slot_1_1122?: React.ReactNode;
}
const Typesecondarystatehoversizebig = (
    props: TypesecondarystatehoversizebigProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1119,
        slot_1_1120,
        slot_1_1121,
        slot_1_1122
    } = props;

    return (
        <div
            className={["component-1_1118", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1118"
                className="Pixso-symbol-1_1118 pixso-relative-flex"
            >
                {slot_1_1119 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1119"
                            className="Pixso-instance-1_1119 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1120 ?? (
                    <p
                        id="1_1120"
                        className="Pixso-paragraph-1_1120 text-semibold16-1_10395 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1121 ??
                    (visible_4958_42 && (
                        <Typeaccentsizebig
                            id="1_1121"
                            className="Pixso-instance-1_1121 pixso-relative-no-shrink"
                        ></Typeaccentsizebig>
                    ))}
                {slot_1_1122 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1122"
                            className="Pixso-instance-1_1122 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typesecondarystatehoversizebig;
