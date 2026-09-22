import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typedisablesizesmall from "@/components/Typedisablesizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typedisabledstatepressedsizesmall.css";
interface TypedisabledstatepressedsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1364?: React.ReactNode;
    slot_1_1365?: React.ReactNode;
    slot_1_1366?: React.ReactNode;
    slot_1_1367?: React.ReactNode;
}
const Typedisabledstatepressedsizesmall = (
    props: TypedisabledstatepressedsizesmallProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1364,
        slot_1_1365,
        slot_1_1366,
        slot_1_1367
    } = props;

    return (
        <div
            className={["component-1_1363", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1363"
                className="Pixso-symbol-1_1363 pixso-relative-flex"
            >
                {slot_1_1364 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1364"
                            className="Pixso-instance-1_1364 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1365 ?? (
                    <p
                        id="1_1365"
                        className="Pixso-paragraph-1_1365 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1366 ??
                    (visible_4958_42 && (
                        <Typedisablesizesmall
                            id="1_1366"
                            className="Pixso-instance-1_1366 pixso-relative-no-shrink"
                        ></Typedisablesizesmall>
                    ))}
                {slot_1_1367 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1367"
                            className="Pixso-instance-1_1367 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typedisabledstatepressedsizesmall;
