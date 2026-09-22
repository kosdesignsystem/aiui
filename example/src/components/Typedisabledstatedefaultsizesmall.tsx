import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typedisablesizesmall from "@/components/Typedisablesizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typedisabledstatedefaultsizesmall.css";
interface TypedisabledstatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1339?: React.ReactNode;
    slot_1_1340?: React.ReactNode;
    slot_1_1341?: React.ReactNode;
    slot_1_1342?: React.ReactNode;
}
const Typedisabledstatedefaultsizesmall = (
    props: TypedisabledstatedefaultsizesmallProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1339,
        slot_1_1340,
        slot_1_1341,
        slot_1_1342
    } = props;

    return (
        <div
            className={["component-1_1338", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1338"
                className="Pixso-symbol-1_1338 pixso-relative-flex"
            >
                {slot_1_1339 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1339"
                            className="Pixso-instance-1_1339 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1340 ?? (
                    <p
                        id="1_1340"
                        className="Pixso-paragraph-1_1340 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1341 ??
                    (visible_4958_42 && (
                        <Typedisablesizesmall
                            id="1_1341"
                            className="Pixso-instance-1_1341 pixso-relative-no-shrink"
                        ></Typedisablesizesmall>
                    ))}
                {slot_1_1342 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1342"
                            className="Pixso-instance-1_1342 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typedisabledstatedefaultsizesmall;
