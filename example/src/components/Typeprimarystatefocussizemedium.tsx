import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeonaccentsizesmall from "@/components/Typeonaccentsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typeprimarystatefocussizemedium.css";
interface TypeprimarystatefocussizemediumProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1174?: React.ReactNode;
    slot_1_1175?: React.ReactNode;
    slot_1_1176?: React.ReactNode;
    slot_1_1177?: React.ReactNode;
}
const Typeprimarystatefocussizemedium = (
    props: TypeprimarystatefocussizemediumProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1174,
        slot_1_1175,
        slot_1_1176,
        slot_1_1177
    } = props;

    return (
        <div
            className={["component-1_1173", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1173"
                className="stroke-wrapper-1_1173 pixso-relative-flex"
            >
                <div className="Pixso-symbol-1_1173 pixso-relative-flex">
                    {slot_1_1174 ??
                        (visible_4958_0 && (
                            <Isoutlinetrue38
                                id="1_1174"
                                className="Pixso-instance-1_1174 pixso-relative-no-shrink"
                            ></Isoutlinetrue38>
                        ))}
                    {slot_1_1175 ?? (
                        <p
                            id="1_1175"
                            className="Pixso-paragraph-1_1175 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"Button"}
                        </p>
                    )}
                    {slot_1_1176 ??
                        (visible_4958_42 && (
                            <Typeonaccentsizesmall
                                id="1_1176"
                                className="Pixso-instance-1_1176 pixso-relative-no-shrink"
                            ></Typeonaccentsizesmall>
                        ))}
                    {slot_1_1177 ??
                        (visible_4958_84 && (
                            <Chevronright0
                                id="1_1177"
                                className="Pixso-instance-1_1177 pixso-relative-no-shrink"
                            ></Chevronright0>
                        ))}
                </div>
                <div className="stroke-1_1173"></div>
            </div>
        </div>
    );
};
export default Typeprimarystatefocussizemedium;
