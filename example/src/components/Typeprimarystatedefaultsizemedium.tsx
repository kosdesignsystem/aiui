import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeonaccentsizesmall from "@/components/Typeonaccentsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typeprimarystatedefaultsizemedium.css";
interface TypeprimarystatedefaultsizemediumProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1169?: React.ReactNode;
    slot_1_1170?: React.ReactNode;
    slot_1_1171?: React.ReactNode;
    slot_1_1172?: React.ReactNode;
}
const Typeprimarystatedefaultsizemedium = (
    props: TypeprimarystatedefaultsizemediumProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1169,
        slot_1_1170,
        slot_1_1171,
        slot_1_1172
    } = props;

    return (
        <div
            className={["component-1_1168", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1168"
                className="Pixso-symbol-1_1168 pixso-relative-flex"
            >
                {slot_1_1169 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1169"
                            className="Pixso-instance-1_1169 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1170 ?? (
                    <p
                        id="1_1170"
                        className="Pixso-paragraph-1_1170 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1171 ??
                    (visible_4958_42 && (
                        <Typeonaccentsizesmall
                            id="1_1171"
                            className="Pixso-instance-1_1171 pixso-relative-no-shrink"
                        ></Typeonaccentsizesmall>
                    ))}
                {slot_1_1172 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1172"
                            className="Pixso-instance-1_1172 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typeprimarystatedefaultsizemedium;
