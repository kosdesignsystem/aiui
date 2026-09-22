import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typedefaultsizesmall from "@/components/Typedefaultsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typedefaultstatefocussizemedium.css";
interface TypedefaultstatefocussizemediumProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1294?: React.ReactNode;
    slot_1_1295?: React.ReactNode;
    slot_1_1296?: React.ReactNode;
    slot_1_1297?: React.ReactNode;
}
const Typedefaultstatefocussizemedium = (
    props: TypedefaultstatefocussizemediumProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1294,
        slot_1_1295,
        slot_1_1296,
        slot_1_1297
    } = props;

    return (
        <div
            className={["component-1_1293", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1293"
                className="stroke-wrapper-1_1293 pixso-relative-flex"
            >
                <div className="Pixso-symbol-1_1293 pixso-relative-flex">
                    {slot_1_1294 ??
                        (visible_4958_0 && (
                            <Isoutlinetrue38
                                id="1_1294"
                                className="Pixso-instance-1_1294 pixso-relative-no-shrink"
                            ></Isoutlinetrue38>
                        ))}
                    {slot_1_1295 ?? (
                        <p
                            id="1_1295"
                            className="Pixso-paragraph-1_1295 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"Button"}
                        </p>
                    )}
                    {slot_1_1296 ??
                        (visible_4958_42 && (
                            <Typedefaultsizesmall
                                id="1_1296"
                                className="Pixso-instance-1_1296 pixso-relative-no-shrink"
                            ></Typedefaultsizesmall>
                        ))}
                    {slot_1_1297 ??
                        (visible_4958_84 && (
                            <Chevronright0
                                id="1_1297"
                                className="Pixso-instance-1_1297 pixso-relative-no-shrink"
                            ></Chevronright0>
                        ))}
                </div>
                <div className="stroke-1_1293"></div>
            </div>
        </div>
    );
};
export default Typedefaultstatefocussizemedium;
