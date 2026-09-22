import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeaccentsizebig from "@/components/Typeaccentsizebig";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typesecondarystatedefaultsizebig.css";
interface TypesecondarystatedefaultsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1109?: React.ReactNode;
    slot_1_1110?: React.ReactNode;
    slot_1_1111?: React.ReactNode;
    slot_1_1112?: React.ReactNode;
}
const Typesecondarystatedefaultsizebig = (
    props: TypesecondarystatedefaultsizebigProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1109,
        slot_1_1110,
        slot_1_1111,
        slot_1_1112
    } = props;

    return (
        <div
            className={["component-1_1108", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1108"
                className="Pixso-symbol-1_1108 pixso-relative-flex"
            >
                {slot_1_1109 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1109"
                            className="Pixso-instance-1_1109 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1110 ?? (
                    <p
                        id="1_1110"
                        className="Pixso-paragraph-1_1110 text-semibold16-1_10395 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1111 ??
                    (visible_4958_42 && (
                        <Typeaccentsizebig
                            id="1_1111"
                            className="Pixso-instance-1_1111 pixso-relative-no-shrink"
                        ></Typeaccentsizebig>
                    ))}
                {slot_1_1112 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1112"
                            className="Pixso-instance-1_1112 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typesecondarystatedefaultsizebig;
