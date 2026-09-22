import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typedisablesizebig from "@/components/Typedisablesizebig";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typedisabledstatedefaultsizebig.css";
interface TypedisabledstatedefaultsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1149?: React.ReactNode;
    slot_1_1150?: React.ReactNode;
    slot_1_1151?: React.ReactNode;
    slot_1_1152?: React.ReactNode;
}
const Typedisabledstatedefaultsizebig = (
    props: TypedisabledstatedefaultsizebigProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1149,
        slot_1_1150,
        slot_1_1151,
        slot_1_1152
    } = props;

    return (
        <div
            className={["component-1_1148", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1148"
                className="Pixso-symbol-1_1148 pixso-relative-flex"
            >
                {slot_1_1149 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1149"
                            className="Pixso-instance-1_1149 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1150 ?? (
                    <p
                        id="1_1150"
                        className="Pixso-paragraph-1_1150 text-semibold16-1_10395 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1151 ??
                    (visible_4958_42 && (
                        <Typedisablesizebig
                            id="1_1151"
                            className="Pixso-instance-1_1151 pixso-relative-no-shrink"
                        ></Typedisablesizebig>
                    ))}
                {slot_1_1152 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1152"
                            className="Pixso-instance-1_1152 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typedisabledstatedefaultsizebig;
