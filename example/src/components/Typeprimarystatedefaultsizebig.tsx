import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeonaccentsizebig from "@/components/Typeonaccentsizebig";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typeprimarystatedefaultsizebig.css";
interface TypeprimarystatedefaultsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1069?: React.ReactNode;
    slot_1_1070?: React.ReactNode;
    slot_1_1071?: React.ReactNode;
    slot_1_1072?: React.ReactNode;
}
const Typeprimarystatedefaultsizebig = (
    props: TypeprimarystatedefaultsizebigProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1069,
        slot_1_1070,
        slot_1_1071,
        slot_1_1072
    } = props;

    return (
        <div
            className={["component-1_1068", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1068"
                className="Pixso-symbol-1_1068 pixso-relative-flex"
            >
                {slot_1_1069 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1069"
                            className="Pixso-instance-1_1069 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1070 ?? (
                    <p
                        id="1_1070"
                        className="Pixso-paragraph-1_1070 text-semibold16-1_10395 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1071 ??
                    (visible_4958_42 && (
                        <Typeonaccentsizebig
                            id="1_1071"
                            className="Pixso-instance-1_1071 pixso-relative-no-shrink"
                        ></Typeonaccentsizebig>
                    ))}
                {slot_1_1072 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1072"
                            className="Pixso-instance-1_1072 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typeprimarystatedefaultsizebig;
