import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeonaccentsizesmall from "@/components/Typeonaccentsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typeprimarystatehoversizesmall.css";
interface TypeprimarystatehoversizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1194?: React.ReactNode;
    slot_1_1195?: React.ReactNode;
    slot_1_1196?: React.ReactNode;
    slot_1_1197?: React.ReactNode;
}
const Typeprimarystatehoversizesmall = (
    props: TypeprimarystatehoversizesmallProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1194,
        slot_1_1195,
        slot_1_1196,
        slot_1_1197
    } = props;

    return (
        <div
            className={["component-1_1193", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1193"
                className="Pixso-symbol-1_1193 pixso-relative-flex"
            >
                {slot_1_1194 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1194"
                            className="Pixso-instance-1_1194 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1195 ?? (
                    <p
                        id="1_1195"
                        className="Pixso-paragraph-1_1195 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1196 ??
                    (visible_4958_42 && (
                        <Typeonaccentsizesmall
                            id="1_1196"
                            className="Pixso-instance-1_1196 pixso-relative-no-shrink"
                        ></Typeonaccentsizesmall>
                    ))}
                {slot_1_1197 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1197"
                            className="Pixso-instance-1_1197 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typeprimarystatehoversizesmall;
