import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeonaccentsizebig from "@/components/Typeonaccentsizebig";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typeprimarystatefocussizebig.css";
interface TypeprimarystatefocussizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1074?: React.ReactNode;
    slot_1_1075?: React.ReactNode;
    slot_1_1076?: React.ReactNode;
    slot_1_1077?: React.ReactNode;
}
const Typeprimarystatefocussizebig = (
    props: TypeprimarystatefocussizebigProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1074,
        slot_1_1075,
        slot_1_1076,
        slot_1_1077
    } = props;

    return (
        <div
            className={["component-1_1073", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1073"
                className="stroke-wrapper-1_1073 pixso-relative-flex"
            >
                <div className="Pixso-symbol-1_1073 pixso-relative-flex">
                    {slot_1_1074 ??
                        (visible_4958_0 && (
                            <Isoutlinetrue38
                                id="1_1074"
                                className="Pixso-instance-1_1074 pixso-relative-no-shrink"
                            ></Isoutlinetrue38>
                        ))}
                    {slot_1_1075 ?? (
                        <p
                            id="1_1075"
                            className="Pixso-paragraph-1_1075 text-semibold16-1_10395 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"Button"}
                        </p>
                    )}
                    {slot_1_1076 ??
                        (visible_4958_42 && (
                            <Typeonaccentsizebig
                                id="1_1076"
                                className="Pixso-instance-1_1076 pixso-relative-no-shrink"
                            ></Typeonaccentsizebig>
                        ))}
                    {slot_1_1077 ??
                        (visible_4958_84 && (
                            <Chevronright0
                                id="1_1077"
                                className="Pixso-instance-1_1077 pixso-relative-no-shrink"
                            ></Chevronright0>
                        ))}
                </div>
                <div className="stroke-1_1073"></div>
            </div>
        </div>
    );
};
export default Typeprimarystatefocussizebig;
