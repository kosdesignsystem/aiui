import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typedefaultsizesmall from "@/components/Typedefaultsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typedefaultstatepressedsizemedium.css";
interface TypedefaultstatepressedsizemediumProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1319?: React.ReactNode;
    slot_1_1320?: React.ReactNode;
    slot_1_1321?: React.ReactNode;
    slot_1_1322?: React.ReactNode;
}
const Typedefaultstatepressedsizemedium = (
    props: TypedefaultstatepressedsizemediumProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1319,
        slot_1_1320,
        slot_1_1321,
        slot_1_1322
    } = props;

    return (
        <div
            className={["component-1_1318", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1318"
                className="Pixso-symbol-1_1318 pixso-relative-flex"
            >
                {slot_1_1319 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1319"
                            className="Pixso-instance-1_1319 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1320 ?? (
                    <p
                        id="1_1320"
                        className="Pixso-paragraph-1_1320 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1321 ??
                    (visible_4958_42 && (
                        <Typedefaultsizesmall
                            id="1_1321"
                            className="Pixso-instance-1_1321 pixso-relative-no-shrink"
                        ></Typedefaultsizesmall>
                    ))}
                {slot_1_1322 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1322"
                            className="Pixso-instance-1_1322 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typedefaultstatepressedsizemedium;
