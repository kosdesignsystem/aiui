import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typedisablesizesmall from "@/components/Typedisablesizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typedisabledstatepressedsizemedium.css";
interface TypedisabledstatepressedsizemediumProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1359?: React.ReactNode;
    slot_1_1360?: React.ReactNode;
    slot_1_1361?: React.ReactNode;
    slot_1_1362?: React.ReactNode;
}
const Typedisabledstatepressedsizemedium = (
    props: TypedisabledstatepressedsizemediumProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1359,
        slot_1_1360,
        slot_1_1361,
        slot_1_1362
    } = props;

    return (
        <div
            className={["component-1_1358", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1358"
                className="Pixso-symbol-1_1358 pixso-relative-flex"
            >
                {slot_1_1359 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1359"
                            className="Pixso-instance-1_1359 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1360 ?? (
                    <p
                        id="1_1360"
                        className="Pixso-paragraph-1_1360 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1361 ??
                    (visible_4958_42 && (
                        <Typedisablesizesmall
                            id="1_1361"
                            className="Pixso-instance-1_1361 pixso-relative-no-shrink"
                        ></Typedisablesizesmall>
                    ))}
                {slot_1_1362 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1362"
                            className="Pixso-instance-1_1362 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typedisabledstatepressedsizemedium;
