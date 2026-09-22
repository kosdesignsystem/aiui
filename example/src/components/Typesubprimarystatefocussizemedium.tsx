import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeaccentsizesmall from "@/components/Typeaccentsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typesubprimarystatefocussizemedium.css";
interface TypesubprimarystatefocussizemediumProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1214?: React.ReactNode;
    slot_1_1215?: React.ReactNode;
    slot_1_1216?: React.ReactNode;
    slot_1_1217?: React.ReactNode;
}
const Typesubprimarystatefocussizemedium = (
    props: TypesubprimarystatefocussizemediumProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1214,
        slot_1_1215,
        slot_1_1216,
        slot_1_1217
    } = props;

    return (
        <div
            className={["component-1_1213", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1213"
                className="stroke-wrapper-1_1213 pixso-relative-flex"
            >
                <div className="Pixso-symbol-1_1213 pixso-relative-flex">
                    {slot_1_1214 ??
                        (visible_4958_0 && (
                            <Isoutlinetrue38
                                id="1_1214"
                                className="Pixso-instance-1_1214 pixso-relative-no-shrink"
                            ></Isoutlinetrue38>
                        ))}
                    {slot_1_1215 ?? (
                        <p
                            id="1_1215"
                            className="Pixso-paragraph-1_1215 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"Button"}
                        </p>
                    )}
                    {slot_1_1216 ??
                        (visible_4958_42 && (
                            <Typeaccentsizesmall
                                id="1_1216"
                                className="Pixso-instance-1_1216 pixso-relative-no-shrink"
                            ></Typeaccentsizesmall>
                        ))}
                    {slot_1_1217 ??
                        (visible_4958_84 && (
                            <Chevronright0
                                id="1_1217"
                                className="Pixso-instance-1_1217 pixso-relative-no-shrink"
                            ></Chevronright0>
                        ))}
                </div>
                <div className="stroke-1_1213"></div>
            </div>
        </div>
    );
};
export default Typesubprimarystatefocussizemedium;
