import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typedisablesizesmall from "@/components/Typedisablesizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typedisabledstatedefaultsizemedium.css";
interface TypedisabledstatedefaultsizemediumProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1329?: React.ReactNode;
    slot_1_1330?: React.ReactNode;
    slot_1_1331?: React.ReactNode;
    slot_1_1332?: React.ReactNode;
}
const Typedisabledstatedefaultsizemedium = (
    props: TypedisabledstatedefaultsizemediumProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1329,
        slot_1_1330,
        slot_1_1331,
        slot_1_1332
    } = props;

    return (
        <div
            className={["component-1_1328", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1328"
                className="Pixso-symbol-1_1328 pixso-relative-flex"
            >
                {slot_1_1329 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1329"
                            className="Pixso-instance-1_1329 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1330 ?? (
                    <p
                        id="1_1330"
                        className="Pixso-paragraph-1_1330 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1331 ??
                    (visible_4958_42 && (
                        <Typedisablesizesmall
                            id="1_1331"
                            className="Pixso-instance-1_1331 pixso-relative-no-shrink"
                        ></Typedisablesizesmall>
                    ))}
                {slot_1_1332 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1332"
                            className="Pixso-instance-1_1332 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typedisabledstatedefaultsizemedium;
