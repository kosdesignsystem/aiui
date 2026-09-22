import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeaccentsizesmall from "@/components/Typeaccentsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typesecondarystatepressedsizesmall.css";
interface TypesecondarystatepressedsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1284?: React.ReactNode;
    slot_1_1285?: React.ReactNode;
    slot_1_1286?: React.ReactNode;
    slot_1_1287?: React.ReactNode;
}
const Typesecondarystatepressedsizesmall = (
    props: TypesecondarystatepressedsizesmallProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1284,
        slot_1_1285,
        slot_1_1286,
        slot_1_1287
    } = props;

    return (
        <div
            className={["component-1_1283", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1283"
                className="Pixso-symbol-1_1283 pixso-relative-flex"
            >
                {slot_1_1284 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1284"
                            className="Pixso-instance-1_1284 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1285 ?? (
                    <p
                        id="1_1285"
                        className="Pixso-paragraph-1_1285 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1286 ??
                    (visible_4958_42 && (
                        <Typeaccentsizesmall
                            id="1_1286"
                            className="Pixso-instance-1_1286 pixso-relative-no-shrink"
                        ></Typeaccentsizesmall>
                    ))}
                {slot_1_1287 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1287"
                            className="Pixso-instance-1_1287 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typesecondarystatepressedsizesmall;
