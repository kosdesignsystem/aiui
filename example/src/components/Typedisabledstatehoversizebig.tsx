import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typedisablesizebig from "@/components/Typedisablesizebig";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typedisabledstatehoversizebig.css";
interface TypedisabledstatehoversizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1159?: React.ReactNode;
    slot_1_1160?: React.ReactNode;
    slot_1_1161?: React.ReactNode;
    slot_1_1162?: React.ReactNode;
}
const Typedisabledstatehoversizebig = (
    props: TypedisabledstatehoversizebigProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1159,
        slot_1_1160,
        slot_1_1161,
        slot_1_1162
    } = props;

    return (
        <div
            className={["component-1_1158", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1158"
                className="Pixso-symbol-1_1158 pixso-relative-flex"
            >
                {slot_1_1159 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1159"
                            className="Pixso-instance-1_1159 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1160 ?? (
                    <p
                        id="1_1160"
                        className="Pixso-paragraph-1_1160 text-semibold16-1_10395 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1161 ??
                    (visible_4958_42 && (
                        <Typedisablesizebig
                            id="1_1161"
                            className="Pixso-instance-1_1161 pixso-relative-no-shrink"
                        ></Typedisablesizebig>
                    ))}
                {slot_1_1162 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1162"
                            className="Pixso-instance-1_1162 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typedisabledstatehoversizebig;
