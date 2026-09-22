import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typedefaultsizesmall from "@/components/Typedefaultsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typedefaultstatepressedsizesmall.css";
interface TypedefaultstatepressedsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1324?: React.ReactNode;
    slot_1_1325?: React.ReactNode;
    slot_1_1326?: React.ReactNode;
    slot_1_1327?: React.ReactNode;
}
const Typedefaultstatepressedsizesmall = (
    props: TypedefaultstatepressedsizesmallProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1324,
        slot_1_1325,
        slot_1_1326,
        slot_1_1327
    } = props;

    return (
        <div
            className={["component-1_1323", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1323"
                className="Pixso-symbol-1_1323 pixso-relative-flex"
            >
                {slot_1_1324 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1324"
                            className="Pixso-instance-1_1324 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1325 ?? (
                    <p
                        id="1_1325"
                        className="Pixso-paragraph-1_1325 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1326 ??
                    (visible_4958_42 && (
                        <Typedefaultsizesmall
                            id="1_1326"
                            className="Pixso-instance-1_1326 pixso-relative-no-shrink"
                        ></Typedefaultsizesmall>
                    ))}
                {slot_1_1327 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1327"
                            className="Pixso-instance-1_1327 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typedefaultstatepressedsizesmall;
