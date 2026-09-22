import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeonaccentsizesmall from "@/components/Typeonaccentsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typeprimarystatedefaultsizesmall.css";
interface TypeprimarystatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1179?: React.ReactNode;
    slot_1_1180?: React.ReactNode;
    slot_1_1181?: React.ReactNode;
    slot_1_1182?: React.ReactNode;
}
const Typeprimarystatedefaultsizesmall = (
    props: TypeprimarystatedefaultsizesmallProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1179,
        slot_1_1180,
        slot_1_1181,
        slot_1_1182
    } = props;

    return (
        <div
            className={["component-1_1178", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1178"
                className="Pixso-symbol-1_1178 pixso-relative-flex"
            >
                {slot_1_1179 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1179"
                            className="Pixso-instance-1_1179 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1180 ?? (
                    <p
                        id="1_1180"
                        className="Pixso-paragraph-1_1180 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1181 ??
                    (visible_4958_42 && (
                        <Typeonaccentsizesmall
                            id="1_1181"
                            className="Pixso-instance-1_1181 pixso-relative-no-shrink"
                        ></Typeonaccentsizesmall>
                    ))}
                {slot_1_1182 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1182"
                            className="Pixso-instance-1_1182 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typeprimarystatedefaultsizesmall;
