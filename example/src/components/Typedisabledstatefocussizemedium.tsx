import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typedisablesizesmall from "@/components/Typedisablesizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typedisabledstatefocussizemedium.css";
interface TypedisabledstatefocussizemediumProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1334?: React.ReactNode;
    slot_1_1335?: React.ReactNode;
    slot_1_1336?: React.ReactNode;
    slot_1_1337?: React.ReactNode;
}
const Typedisabledstatefocussizemedium = (
    props: TypedisabledstatefocussizemediumProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1334,
        slot_1_1335,
        slot_1_1336,
        slot_1_1337
    } = props;

    return (
        <div
            className={["component-1_1333", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1333"
                className="Pixso-symbol-1_1333 pixso-relative-flex"
            >
                {slot_1_1334 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1334"
                            className="Pixso-instance-1_1334 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1335 ?? (
                    <p
                        id="1_1335"
                        className="Pixso-paragraph-1_1335 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1336 ??
                    (visible_4958_42 && (
                        <Typedisablesizesmall
                            id="1_1336"
                            className="Pixso-instance-1_1336 pixso-relative-no-shrink"
                        ></Typedisablesizesmall>
                    ))}
                {slot_1_1337 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1337"
                            className="Pixso-instance-1_1337 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typedisabledstatefocussizemedium;
