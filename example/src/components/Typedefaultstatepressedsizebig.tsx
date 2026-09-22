import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typedefaultsizebig from "@/components/Typedefaultsizebig";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typedefaultstatepressedsizebig.css";
interface TypedefaultstatepressedsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1144?: React.ReactNode;
    slot_1_1145?: React.ReactNode;
    slot_1_1146?: React.ReactNode;
    slot_1_1147?: React.ReactNode;
}
const Typedefaultstatepressedsizebig = (
    props: TypedefaultstatepressedsizebigProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1144,
        slot_1_1145,
        slot_1_1146,
        slot_1_1147
    } = props;

    return (
        <div
            className={["component-1_1143", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1143"
                className="Pixso-symbol-1_1143 pixso-relative-flex"
            >
                {slot_1_1144 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1144"
                            className="Pixso-instance-1_1144 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1145 ?? (
                    <p
                        id="1_1145"
                        className="Pixso-paragraph-1_1145 text-semibold16-1_10395 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1146 ??
                    (visible_4958_42 && (
                        <Typedefaultsizebig
                            id="1_1146"
                            className="Pixso-instance-1_1146 pixso-relative-no-shrink"
                        ></Typedefaultsizebig>
                    ))}
                {slot_1_1147 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1147"
                            className="Pixso-instance-1_1147 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typedefaultstatepressedsizebig;
