import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typedefaultsizesmall from "@/components/Typedefaultsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typedefaultstatehoversizemedium.css";
interface TypedefaultstatehoversizemediumProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1309?: React.ReactNode;
    slot_1_1310?: React.ReactNode;
    slot_1_1311?: React.ReactNode;
    slot_1_1312?: React.ReactNode;
}
const Typedefaultstatehoversizemedium = (
    props: TypedefaultstatehoversizemediumProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1309,
        slot_1_1310,
        slot_1_1311,
        slot_1_1312
    } = props;

    return (
        <div
            className={["component-1_1308", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1308"
                className="Pixso-symbol-1_1308 pixso-relative-flex"
            >
                {slot_1_1309 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1309"
                            className="Pixso-instance-1_1309 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1310 ?? (
                    <p
                        id="1_1310"
                        className="Pixso-paragraph-1_1310 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1311 ??
                    (visible_4958_42 && (
                        <Typedefaultsizesmall
                            id="1_1311"
                            className="Pixso-instance-1_1311 pixso-relative-no-shrink"
                        ></Typedefaultsizesmall>
                    ))}
                {slot_1_1312 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1312"
                            className="Pixso-instance-1_1312 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typedefaultstatehoversizemedium;
