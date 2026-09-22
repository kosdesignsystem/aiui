import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeaccentsizesmall from "@/components/Typeaccentsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typesecondarystatepressedsizemedium.css";
interface TypesecondarystatepressedsizemediumProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1279?: React.ReactNode;
    slot_1_1280?: React.ReactNode;
    slot_1_1281?: React.ReactNode;
    slot_1_1282?: React.ReactNode;
}
const Typesecondarystatepressedsizemedium = (
    props: TypesecondarystatepressedsizemediumProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1279,
        slot_1_1280,
        slot_1_1281,
        slot_1_1282
    } = props;

    return (
        <div
            className={["component-1_1278", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1278"
                className="Pixso-symbol-1_1278 pixso-relative-flex"
            >
                {slot_1_1279 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1279"
                            className="Pixso-instance-1_1279 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1280 ?? (
                    <p
                        id="1_1280"
                        className="Pixso-paragraph-1_1280 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1281 ??
                    (visible_4958_42 && (
                        <Typeaccentsizesmall
                            id="1_1281"
                            className="Pixso-instance-1_1281 pixso-relative-no-shrink"
                        ></Typeaccentsizesmall>
                    ))}
                {slot_1_1282 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1282"
                            className="Pixso-instance-1_1282 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typesecondarystatepressedsizemedium;
