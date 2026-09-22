import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typedefaultsizesmall from "@/components/Typedefaultsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typedefaultstatehoversizesmall.css";
interface TypedefaultstatehoversizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1314?: React.ReactNode;
    slot_1_1315?: React.ReactNode;
    slot_1_1316?: React.ReactNode;
    slot_1_1317?: React.ReactNode;
}
const Typedefaultstatehoversizesmall = (
    props: TypedefaultstatehoversizesmallProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1314,
        slot_1_1315,
        slot_1_1316,
        slot_1_1317
    } = props;

    return (
        <div
            className={["component-1_1313", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1313"
                className="Pixso-symbol-1_1313 pixso-relative-flex"
            >
                {slot_1_1314 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1314"
                            className="Pixso-instance-1_1314 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1315 ?? (
                    <p
                        id="1_1315"
                        className="Pixso-paragraph-1_1315 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1316 ??
                    (visible_4958_42 && (
                        <Typedefaultsizesmall
                            id="1_1316"
                            className="Pixso-instance-1_1316 pixso-relative-no-shrink"
                        ></Typedefaultsizesmall>
                    ))}
                {slot_1_1317 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1317"
                            className="Pixso-instance-1_1317 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typedefaultstatehoversizesmall;
