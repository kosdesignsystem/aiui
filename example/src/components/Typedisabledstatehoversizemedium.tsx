import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typedisablesizesmall from "@/components/Typedisablesizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typedisabledstatehoversizemedium.css";
interface TypedisabledstatehoversizemediumProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1349?: React.ReactNode;
    slot_1_1350?: React.ReactNode;
    slot_1_1351?: React.ReactNode;
    slot_1_1352?: React.ReactNode;
}
const Typedisabledstatehoversizemedium = (
    props: TypedisabledstatehoversizemediumProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1349,
        slot_1_1350,
        slot_1_1351,
        slot_1_1352
    } = props;

    return (
        <div
            className={["component-1_1348", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1348"
                className="Pixso-symbol-1_1348 pixso-relative-flex"
            >
                {slot_1_1349 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1349"
                            className="Pixso-instance-1_1349 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1350 ?? (
                    <p
                        id="1_1350"
                        className="Pixso-paragraph-1_1350 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1351 ??
                    (visible_4958_42 && (
                        <Typedisablesizesmall
                            id="1_1351"
                            className="Pixso-instance-1_1351 pixso-relative-no-shrink"
                        ></Typedisablesizesmall>
                    ))}
                {slot_1_1352 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1352"
                            className="Pixso-instance-1_1352 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typedisabledstatehoversizemedium;
