import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeaccentsizesmall from "@/components/Typeaccentsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typesubprimarystatefocussizesmall.css";
interface TypesubprimarystatefocussizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1224?: React.ReactNode;
    slot_1_1225?: React.ReactNode;
    slot_1_1226?: React.ReactNode;
    slot_1_1227?: React.ReactNode;
}
const Typesubprimarystatefocussizesmall = (
    props: TypesubprimarystatefocussizesmallProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1224,
        slot_1_1225,
        slot_1_1226,
        slot_1_1227
    } = props;

    return (
        <div
            className={["component-1_1223", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1223"
                className="stroke-wrapper-1_1223 pixso-relative-flex"
            >
                <div className="Pixso-symbol-1_1223 pixso-relative-flex">
                    {slot_1_1224 ??
                        (visible_4958_0 && (
                            <Isoutlinetrue38
                                id="1_1224"
                                className="Pixso-instance-1_1224 pixso-relative-no-shrink"
                            ></Isoutlinetrue38>
                        ))}
                    {slot_1_1225 ?? (
                        <p
                            id="1_1225"
                            className="Pixso-paragraph-1_1225 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"Button"}
                        </p>
                    )}
                    {slot_1_1226 ??
                        (visible_4958_42 && (
                            <Typeaccentsizesmall
                                id="1_1226"
                                className="Pixso-instance-1_1226 pixso-relative-no-shrink"
                            ></Typeaccentsizesmall>
                        ))}
                    {slot_1_1227 ??
                        (visible_4958_84 && (
                            <Chevronright0
                                id="1_1227"
                                className="Pixso-instance-1_1227 pixso-relative-no-shrink"
                            ></Chevronright0>
                        ))}
                </div>
                <div className="stroke-1_1223"></div>
            </div>
        </div>
    );
};
export default Typesubprimarystatefocussizesmall;
