import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeaccentsizesmall from "@/components/Typeaccentsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typesecondarystatehoversizesmall.css";
interface TypesecondarystatehoversizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1274?: React.ReactNode;
    slot_1_1275?: React.ReactNode;
    slot_1_1276?: React.ReactNode;
    slot_1_1277?: React.ReactNode;
}
const Typesecondarystatehoversizesmall = (
    props: TypesecondarystatehoversizesmallProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1274,
        slot_1_1275,
        slot_1_1276,
        slot_1_1277
    } = props;

    return (
        <div
            className={["component-1_1273", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1273"
                className="Pixso-symbol-1_1273 pixso-relative-flex"
            >
                {slot_1_1274 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1274"
                            className="Pixso-instance-1_1274 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1275 ?? (
                    <p
                        id="1_1275"
                        className="Pixso-paragraph-1_1275 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1276 ??
                    (visible_4958_42 && (
                        <Typeaccentsizesmall
                            id="1_1276"
                            className="Pixso-instance-1_1276 pixso-relative-no-shrink"
                        ></Typeaccentsizesmall>
                    ))}
                {slot_1_1277 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1277"
                            className="Pixso-instance-1_1277 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typesecondarystatehoversizesmall;
