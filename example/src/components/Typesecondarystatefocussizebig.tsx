import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeaccentsizebig from "@/components/Typeaccentsizebig";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typesecondarystatefocussizebig.css";
interface TypesecondarystatefocussizebigProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1114?: React.ReactNode;
    slot_1_1115?: React.ReactNode;
    slot_1_1116?: React.ReactNode;
    slot_1_1117?: React.ReactNode;
}
const Typesecondarystatefocussizebig = (
    props: TypesecondarystatefocussizebigProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1114,
        slot_1_1115,
        slot_1_1116,
        slot_1_1117
    } = props;

    return (
        <div
            className={["component-1_1113", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1113"
                className="stroke-wrapper-1_1113 pixso-relative-flex"
            >
                <div className="Pixso-symbol-1_1113 pixso-relative-flex">
                    {slot_1_1114 ??
                        (visible_4958_0 && (
                            <Isoutlinetrue38
                                id="1_1114"
                                className="Pixso-instance-1_1114 pixso-relative-no-shrink"
                            ></Isoutlinetrue38>
                        ))}
                    {slot_1_1115 ?? (
                        <p
                            id="1_1115"
                            className="Pixso-paragraph-1_1115 text-semibold16-1_10395 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"Button"}
                        </p>
                    )}
                    {slot_1_1116 ??
                        (visible_4958_42 && (
                            <Typeaccentsizebig
                                id="1_1116"
                                className="Pixso-instance-1_1116 pixso-relative-no-shrink"
                            ></Typeaccentsizebig>
                        ))}
                    {slot_1_1117 ??
                        (visible_4958_84 && (
                            <Chevronright0
                                id="1_1117"
                                className="Pixso-instance-1_1117 pixso-relative-no-shrink"
                            ></Chevronright0>
                        ))}
                </div>
                <div className="stroke-1_1113"></div>
            </div>
        </div>
    );
};
export default Typesecondarystatefocussizebig;
