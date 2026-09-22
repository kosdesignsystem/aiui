import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typedisablesizebig from "@/components/Typedisablesizebig";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typedisabledstatefocussizebig.css";
interface TypedisabledstatefocussizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1154?: React.ReactNode;
    slot_1_1155?: React.ReactNode;
    slot_1_1156?: React.ReactNode;
    slot_1_1157?: React.ReactNode;
}
const Typedisabledstatefocussizebig = (
    props: TypedisabledstatefocussizebigProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1154,
        slot_1_1155,
        slot_1_1156,
        slot_1_1157
    } = props;

    return (
        <div
            className={["component-1_1153", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1153"
                className="Pixso-symbol-1_1153 pixso-relative-flex"
            >
                {slot_1_1154 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1154"
                            className="Pixso-instance-1_1154 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1155 ?? (
                    <p
                        id="1_1155"
                        className="Pixso-paragraph-1_1155 text-semibold16-1_10395 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1156 ??
                    (visible_4958_42 && (
                        <Typedisablesizebig
                            id="1_1156"
                            className="Pixso-instance-1_1156 pixso-relative-no-shrink"
                        ></Typedisablesizebig>
                    ))}
                {slot_1_1157 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1157"
                            className="Pixso-instance-1_1157 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typedisabledstatefocussizebig;
