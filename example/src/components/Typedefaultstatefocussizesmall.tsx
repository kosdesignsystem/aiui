import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typedefaultsizesmall from "@/components/Typedefaultsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typedefaultstatefocussizesmall.css";
interface TypedefaultstatefocussizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1304?: React.ReactNode;
    slot_1_1305?: React.ReactNode;
    slot_1_1306?: React.ReactNode;
    slot_1_1307?: React.ReactNode;
}
const Typedefaultstatefocussizesmall = (
    props: TypedefaultstatefocussizesmallProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1304,
        slot_1_1305,
        slot_1_1306,
        slot_1_1307
    } = props;

    return (
        <div
            className={["component-1_1303", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1303"
                className="stroke-wrapper-1_1303 pixso-relative-flex"
            >
                <div className="Pixso-symbol-1_1303 pixso-relative-flex">
                    {slot_1_1304 ??
                        (visible_4958_0 && (
                            <Isoutlinetrue38
                                id="1_1304"
                                className="Pixso-instance-1_1304 pixso-relative-no-shrink"
                            ></Isoutlinetrue38>
                        ))}
                    {slot_1_1305 ?? (
                        <p
                            id="1_1305"
                            className="Pixso-paragraph-1_1305 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"Button"}
                        </p>
                    )}
                    {slot_1_1306 ??
                        (visible_4958_42 && (
                            <Typedefaultsizesmall
                                id="1_1306"
                                className="Pixso-instance-1_1306 pixso-relative-no-shrink"
                            ></Typedefaultsizesmall>
                        ))}
                    {slot_1_1307 ??
                        (visible_4958_84 && (
                            <Chevronright0
                                id="1_1307"
                                className="Pixso-instance-1_1307 pixso-relative-no-shrink"
                            ></Chevronright0>
                        ))}
                </div>
                <div className="stroke-1_1303"></div>
            </div>
        </div>
    );
};
export default Typedefaultstatefocussizesmall;
