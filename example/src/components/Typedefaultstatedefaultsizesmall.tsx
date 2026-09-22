import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typedefaultsizesmall from "@/components/Typedefaultsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typedefaultstatedefaultsizesmall.css";
interface TypedefaultstatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1299?: React.ReactNode;
    slot_1_1300?: React.ReactNode;
    slot_1_1301?: React.ReactNode;
    slot_1_1302?: React.ReactNode;
}
const Typedefaultstatedefaultsizesmall = (
    props: TypedefaultstatedefaultsizesmallProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1299,
        slot_1_1300,
        slot_1_1301,
        slot_1_1302
    } = props;

    return (
        <div
            className={["component-1_1298", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1298"
                className="Pixso-symbol-1_1298 pixso-relative-flex"
            >
                {slot_1_1299 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1299"
                            className="Pixso-instance-1_1299 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1300 ?? (
                    <p
                        id="1_1300"
                        className="Pixso-paragraph-1_1300 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1301 ??
                    (visible_4958_42 && (
                        <Typedefaultsizesmall
                            id="1_1301"
                            className="Pixso-instance-1_1301 pixso-relative-no-shrink"
                        ></Typedefaultsizesmall>
                    ))}
                {slot_1_1302 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1302"
                            className="Pixso-instance-1_1302 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typedefaultstatedefaultsizesmall;
