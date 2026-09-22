import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeonaccentsizesmall from "@/components/Typeonaccentsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typeprimarystatepressedsizemedium.css";
interface TypeprimarystatepressedsizemediumProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1199?: React.ReactNode;
    slot_1_1200?: React.ReactNode;
    slot_1_1201?: React.ReactNode;
    slot_1_1202?: React.ReactNode;
}
const Typeprimarystatepressedsizemedium = (
    props: TypeprimarystatepressedsizemediumProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1199,
        slot_1_1200,
        slot_1_1201,
        slot_1_1202
    } = props;

    return (
        <div
            className={["component-1_1198", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1198"
                className="Pixso-symbol-1_1198 pixso-relative-flex"
            >
                {slot_1_1199 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1199"
                            className="Pixso-instance-1_1199 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1200 ?? (
                    <p
                        id="1_1200"
                        className="Pixso-paragraph-1_1200 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1201 ??
                    (visible_4958_42 && (
                        <Typeonaccentsizesmall
                            id="1_1201"
                            className="Pixso-instance-1_1201 pixso-relative-no-shrink"
                        ></Typeonaccentsizesmall>
                    ))}
                {slot_1_1202 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1202"
                            className="Pixso-instance-1_1202 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typeprimarystatepressedsizemedium;
