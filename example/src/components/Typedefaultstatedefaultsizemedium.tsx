import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typedefaultsizesmall from "@/components/Typedefaultsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typedefaultstatedefaultsizemedium.css";
interface TypedefaultstatedefaultsizemediumProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1289?: React.ReactNode;
    slot_1_1290?: React.ReactNode;
    slot_1_1291?: React.ReactNode;
    slot_1_1292?: React.ReactNode;
}
const Typedefaultstatedefaultsizemedium = (
    props: TypedefaultstatedefaultsizemediumProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1289,
        slot_1_1290,
        slot_1_1291,
        slot_1_1292
    } = props;

    return (
        <div
            className={["component-1_1288", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1288"
                className="Pixso-symbol-1_1288 pixso-relative-flex"
            >
                {slot_1_1289 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1289"
                            className="Pixso-instance-1_1289 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1290 ?? (
                    <p
                        id="1_1290"
                        className="Pixso-paragraph-1_1290 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1291 ??
                    (visible_4958_42 && (
                        <Typedefaultsizesmall
                            id="1_1291"
                            className="Pixso-instance-1_1291 pixso-relative-no-shrink"
                        ></Typedefaultsizesmall>
                    ))}
                {slot_1_1292 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1292"
                            className="Pixso-instance-1_1292 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typedefaultstatedefaultsizemedium;
