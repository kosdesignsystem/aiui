import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typedisablesizesmall from "@/components/Typedisablesizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typedisabledstatefocussizesmall.css";
interface TypedisabledstatefocussizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1344?: React.ReactNode;
    slot_1_1345?: React.ReactNode;
    slot_1_1346?: React.ReactNode;
    slot_1_1347?: React.ReactNode;
}
const Typedisabledstatefocussizesmall = (
    props: TypedisabledstatefocussizesmallProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1344,
        slot_1_1345,
        slot_1_1346,
        slot_1_1347
    } = props;

    return (
        <div
            className={["component-1_1343", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1343"
                className="Pixso-symbol-1_1343 pixso-relative-flex"
            >
                {slot_1_1344 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1344"
                            className="Pixso-instance-1_1344 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1345 ?? (
                    <p
                        id="1_1345"
                        className="Pixso-paragraph-1_1345 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1346 ??
                    (visible_4958_42 && (
                        <Typedisablesizesmall
                            id="1_1346"
                            className="Pixso-instance-1_1346 pixso-relative-no-shrink"
                        ></Typedisablesizesmall>
                    ))}
                {slot_1_1347 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1347"
                            className="Pixso-instance-1_1347 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typedisabledstatefocussizesmall;
