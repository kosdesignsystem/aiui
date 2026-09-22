import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeaccentsizesmall from "@/components/Typeaccentsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typesecondarystatehoversizemedium.css";
interface TypesecondarystatehoversizemediumProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1269?: React.ReactNode;
    slot_1_1270?: React.ReactNode;
    slot_1_1271?: React.ReactNode;
    slot_1_1272?: React.ReactNode;
}
const Typesecondarystatehoversizemedium = (
    props: TypesecondarystatehoversizemediumProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1269,
        slot_1_1270,
        slot_1_1271,
        slot_1_1272
    } = props;

    return (
        <div
            className={["component-1_1268", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1268"
                className="Pixso-symbol-1_1268 pixso-relative-flex"
            >
                {slot_1_1269 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1269"
                            className="Pixso-instance-1_1269 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1270 ?? (
                    <p
                        id="1_1270"
                        className="Pixso-paragraph-1_1270 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1271 ??
                    (visible_4958_42 && (
                        <Typeaccentsizesmall
                            id="1_1271"
                            className="Pixso-instance-1_1271 pixso-relative-no-shrink"
                        ></Typeaccentsizesmall>
                    ))}
                {slot_1_1272 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1272"
                            className="Pixso-instance-1_1272 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typesecondarystatehoversizemedium;
