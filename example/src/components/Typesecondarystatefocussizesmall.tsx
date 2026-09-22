import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeaccentsizesmall from "@/components/Typeaccentsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typesecondarystatefocussizesmall.css";
interface TypesecondarystatefocussizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1264?: React.ReactNode;
    slot_1_1265?: React.ReactNode;
    slot_1_1266?: React.ReactNode;
    slot_1_1267?: React.ReactNode;
}
const Typesecondarystatefocussizesmall = (
    props: TypesecondarystatefocussizesmallProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1264,
        slot_1_1265,
        slot_1_1266,
        slot_1_1267
    } = props;

    return (
        <div
            className={["component-1_1263", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1263"
                className="stroke-wrapper-1_1263 pixso-relative-flex"
            >
                <div className="Pixso-symbol-1_1263 pixso-relative-flex">
                    {slot_1_1264 ??
                        (visible_4958_0 && (
                            <Isoutlinetrue38
                                id="1_1264"
                                className="Pixso-instance-1_1264 pixso-relative-no-shrink"
                            ></Isoutlinetrue38>
                        ))}
                    {slot_1_1265 ?? (
                        <p
                            id="1_1265"
                            className="Pixso-paragraph-1_1265 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"Button"}
                        </p>
                    )}
                    {slot_1_1266 ??
                        (visible_4958_42 && (
                            <Typeaccentsizesmall
                                id="1_1266"
                                className="Pixso-instance-1_1266 pixso-relative-no-shrink"
                            ></Typeaccentsizesmall>
                        ))}
                    {slot_1_1267 ??
                        (visible_4958_84 && (
                            <Chevronright0
                                id="1_1267"
                                className="Pixso-instance-1_1267 pixso-relative-no-shrink"
                            ></Chevronright0>
                        ))}
                </div>
                <div className="stroke-1_1263"></div>
            </div>
        </div>
    );
};
export default Typesecondarystatefocussizesmall;
