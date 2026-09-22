import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typedisablesizebig from "@/components/Typedisablesizebig";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typedisabledstatepressedsizebig.css";
interface TypedisabledstatepressedsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1164?: React.ReactNode;
    slot_1_1165?: React.ReactNode;
    slot_1_1166?: React.ReactNode;
    slot_1_1167?: React.ReactNode;
}
const Typedisabledstatepressedsizebig = (
    props: TypedisabledstatepressedsizebigProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1164,
        slot_1_1165,
        slot_1_1166,
        slot_1_1167
    } = props;

    return (
        <div
            className={["component-1_1163", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1163"
                className="Pixso-symbol-1_1163 pixso-relative-flex"
            >
                {slot_1_1164 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1164"
                            className="Pixso-instance-1_1164 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1165 ?? (
                    <p
                        id="1_1165"
                        className="Pixso-paragraph-1_1165 text-semibold16-1_10395 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1166 ??
                    (visible_4958_42 && (
                        <Typedisablesizebig
                            id="1_1166"
                            className="Pixso-instance-1_1166 pixso-relative-no-shrink"
                        ></Typedisablesizebig>
                    ))}
                {slot_1_1167 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1167"
                            className="Pixso-instance-1_1167 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typedisabledstatepressedsizebig;
