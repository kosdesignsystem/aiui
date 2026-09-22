import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeaccentsizebig from "@/components/Typeaccentsizebig";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typesubprimarystatedefaultsizebig.css";
interface TypesubprimarystatedefaultsizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1089?: React.ReactNode;
    slot_1_1090?: React.ReactNode;
    slot_1_1091?: React.ReactNode;
    slot_1_1092?: React.ReactNode;
}
const Typesubprimarystatedefaultsizebig = (
    props: TypesubprimarystatedefaultsizebigProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1089,
        slot_1_1090,
        slot_1_1091,
        slot_1_1092
    } = props;

    return (
        <div
            className={["component-1_1088", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1088"
                className="Pixso-symbol-1_1088 pixso-relative-flex"
            >
                {slot_1_1089 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1089"
                            className="Pixso-instance-1_1089 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1090 ?? (
                    <p
                        id="1_1090"
                        className="Pixso-paragraph-1_1090 text-semibold16-1_10395 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1091 ??
                    (visible_4958_42 && (
                        <Typeaccentsizebig
                            id="1_1091"
                            className="Pixso-instance-1_1091 pixso-relative-no-shrink"
                        ></Typeaccentsizebig>
                    ))}
                {slot_1_1092 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1092"
                            className="Pixso-instance-1_1092 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typesubprimarystatedefaultsizebig;
