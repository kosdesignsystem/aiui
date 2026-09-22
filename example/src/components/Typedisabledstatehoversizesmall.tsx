import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typedisablesizesmall from "@/components/Typedisablesizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typedisabledstatehoversizesmall.css";
interface TypedisabledstatehoversizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1354?: React.ReactNode;
    slot_1_1355?: React.ReactNode;
    slot_1_1356?: React.ReactNode;
    slot_1_1357?: React.ReactNode;
}
const Typedisabledstatehoversizesmall = (
    props: TypedisabledstatehoversizesmallProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1354,
        slot_1_1355,
        slot_1_1356,
        slot_1_1357
    } = props;

    return (
        <div
            className={["component-1_1353", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1353"
                className="Pixso-symbol-1_1353 pixso-relative-flex"
            >
                {slot_1_1354 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1354"
                            className="Pixso-instance-1_1354 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1355 ?? (
                    <p
                        id="1_1355"
                        className="Pixso-paragraph-1_1355 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1356 ??
                    (visible_4958_42 && (
                        <Typedisablesizesmall
                            id="1_1356"
                            className="Pixso-instance-1_1356 pixso-relative-no-shrink"
                        ></Typedisablesizesmall>
                    ))}
                {slot_1_1357 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1357"
                            className="Pixso-instance-1_1357 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typedisabledstatehoversizesmall;
