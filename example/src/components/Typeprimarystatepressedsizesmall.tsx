import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeonaccentsizesmall from "@/components/Typeonaccentsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typeprimarystatepressedsizesmall.css";
interface TypeprimarystatepressedsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1204?: React.ReactNode;
    slot_1_1205?: React.ReactNode;
    slot_1_1206?: React.ReactNode;
    slot_1_1207?: React.ReactNode;
}
const Typeprimarystatepressedsizesmall = (
    props: TypeprimarystatepressedsizesmallProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1204,
        slot_1_1205,
        slot_1_1206,
        slot_1_1207
    } = props;

    return (
        <div
            className={["component-1_1203", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1203"
                className="Pixso-symbol-1_1203 pixso-relative-flex"
            >
                {slot_1_1204 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1204"
                            className="Pixso-instance-1_1204 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1205 ?? (
                    <p
                        id="1_1205"
                        className="Pixso-paragraph-1_1205 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1206 ??
                    (visible_4958_42 && (
                        <Typeonaccentsizesmall
                            id="1_1206"
                            className="Pixso-instance-1_1206 pixso-relative-no-shrink"
                        ></Typeonaccentsizesmall>
                    ))}
                {slot_1_1207 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1207"
                            className="Pixso-instance-1_1207 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typeprimarystatepressedsizesmall;
