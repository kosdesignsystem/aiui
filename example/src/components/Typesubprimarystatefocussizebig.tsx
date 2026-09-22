import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeaccentsizebig from "@/components/Typeaccentsizebig";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typesubprimarystatefocussizebig.css";
interface TypesubprimarystatefocussizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1094?: React.ReactNode;
    slot_1_1095?: React.ReactNode;
    slot_1_1096?: React.ReactNode;
    slot_1_1097?: React.ReactNode;
}
const Typesubprimarystatefocussizebig = (
    props: TypesubprimarystatefocussizebigProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1094,
        slot_1_1095,
        slot_1_1096,
        slot_1_1097
    } = props;

    return (
        <div
            className={["component-1_1093", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1093"
                className="stroke-wrapper-1_1093 pixso-relative-flex"
            >
                <div className="Pixso-symbol-1_1093 pixso-relative-flex">
                    {slot_1_1094 ??
                        (visible_4958_0 && (
                            <Isoutlinetrue38
                                id="1_1094"
                                className="Pixso-instance-1_1094 pixso-relative-no-shrink"
                            ></Isoutlinetrue38>
                        ))}
                    {slot_1_1095 ?? (
                        <p
                            id="1_1095"
                            className="Pixso-paragraph-1_1095 text-semibold16-1_10395 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"Button"}
                        </p>
                    )}
                    {slot_1_1096 ??
                        (visible_4958_42 && (
                            <Typeaccentsizebig
                                id="1_1096"
                                className="Pixso-instance-1_1096 pixso-relative-no-shrink"
                            ></Typeaccentsizebig>
                        ))}
                    {slot_1_1097 ??
                        (visible_4958_84 && (
                            <Chevronright0
                                id="1_1097"
                                className="Pixso-instance-1_1097 pixso-relative-no-shrink"
                            ></Chevronright0>
                        ))}
                </div>
                <div className="stroke-1_1093"></div>
            </div>
        </div>
    );
};
export default Typesubprimarystatefocussizebig;
