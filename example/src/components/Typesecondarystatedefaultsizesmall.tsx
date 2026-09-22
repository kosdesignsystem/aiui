import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeaccentsizesmall from "@/components/Typeaccentsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typesecondarystatedefaultsizesmall.css";
interface TypesecondarystatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1259?: React.ReactNode;
    slot_1_1260?: React.ReactNode;
    slot_1_1261?: React.ReactNode;
    slot_1_1262?: React.ReactNode;
}
const Typesecondarystatedefaultsizesmall = (
    props: TypesecondarystatedefaultsizesmallProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1259,
        slot_1_1260,
        slot_1_1261,
        slot_1_1262
    } = props;

    return (
        <div
            className={["component-1_1258", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1258"
                className="Pixso-symbol-1_1258 pixso-relative-flex"
            >
                {slot_1_1259 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1259"
                            className="Pixso-instance-1_1259 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1260 ?? (
                    <p
                        id="1_1260"
                        className="Pixso-paragraph-1_1260 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1261 ??
                    (visible_4958_42 && (
                        <Typeaccentsizesmall
                            id="1_1261"
                            className="Pixso-instance-1_1261 pixso-relative-no-shrink"
                        ></Typeaccentsizesmall>
                    ))}
                {slot_1_1262 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1262"
                            className="Pixso-instance-1_1262 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typesecondarystatedefaultsizesmall;
