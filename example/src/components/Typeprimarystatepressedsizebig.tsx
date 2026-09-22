import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeonaccentsizebig from "@/components/Typeonaccentsizebig";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typeprimarystatepressedsizebig.css";
interface TypeprimarystatepressedsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1084?: React.ReactNode;
    slot_1_1085?: React.ReactNode;
    slot_1_1086?: React.ReactNode;
    slot_1_1087?: React.ReactNode;
}
const Typeprimarystatepressedsizebig = (
    props: TypeprimarystatepressedsizebigProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1084,
        slot_1_1085,
        slot_1_1086,
        slot_1_1087
    } = props;

    return (
        <div
            className={["component-1_1083", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1083"
                className="Pixso-symbol-1_1083 pixso-relative-flex"
            >
                {slot_1_1084 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1084"
                            className="Pixso-instance-1_1084 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1085 ?? (
                    <p
                        id="1_1085"
                        className="Pixso-paragraph-1_1085 text-semibold16-1_10395 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1086 ??
                    (visible_4958_42 && (
                        <Typeonaccentsizebig
                            id="1_1086"
                            className="Pixso-instance-1_1086 pixso-relative-no-shrink"
                        ></Typeonaccentsizebig>
                    ))}
                {slot_1_1087 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1087"
                            className="Pixso-instance-1_1087 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typeprimarystatepressedsizebig;
