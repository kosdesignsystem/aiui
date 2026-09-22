import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeaccentsizesmall from "@/components/Typeaccentsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typesecondarystatefocussizemedium.css";
interface TypesecondarystatefocussizemediumProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1254?: React.ReactNode;
    slot_1_1255?: React.ReactNode;
    slot_1_1256?: React.ReactNode;
    slot_1_1257?: React.ReactNode;
}
const Typesecondarystatefocussizemedium = (
    props: TypesecondarystatefocussizemediumProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1254,
        slot_1_1255,
        slot_1_1256,
        slot_1_1257
    } = props;

    return (
        <div
            className={["component-1_1253", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1253"
                className="stroke-wrapper-1_1253 pixso-relative-flex"
            >
                <div className="Pixso-symbol-1_1253 pixso-relative-flex">
                    {slot_1_1254 ??
                        (visible_4958_0 && (
                            <Isoutlinetrue38
                                id="1_1254"
                                className="Pixso-instance-1_1254 pixso-relative-no-shrink"
                            ></Isoutlinetrue38>
                        ))}
                    {slot_1_1255 ?? (
                        <p
                            id="1_1255"
                            className="Pixso-paragraph-1_1255 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"Button"}
                        </p>
                    )}
                    {slot_1_1256 ??
                        (visible_4958_42 && (
                            <Typeaccentsizesmall
                                id="1_1256"
                                className="Pixso-instance-1_1256 pixso-relative-no-shrink"
                            ></Typeaccentsizesmall>
                        ))}
                    {slot_1_1257 ??
                        (visible_4958_84 && (
                            <Chevronright0
                                id="1_1257"
                                className="Pixso-instance-1_1257 pixso-relative-no-shrink"
                            ></Chevronright0>
                        ))}
                </div>
                <div className="stroke-1_1253"></div>
            </div>
        </div>
    );
};
export default Typesecondarystatefocussizemedium;
