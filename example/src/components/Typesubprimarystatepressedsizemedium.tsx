import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeaccentsizesmall from "@/components/Typeaccentsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typesubprimarystatepressedsizemedium.css";
interface TypesubprimarystatepressedsizemediumProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1239?: React.ReactNode;
    slot_1_1240?: React.ReactNode;
    slot_1_1241?: React.ReactNode;
    slot_1_1242?: React.ReactNode;
}
const Typesubprimarystatepressedsizemedium = (
    props: TypesubprimarystatepressedsizemediumProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1239,
        slot_1_1240,
        slot_1_1241,
        slot_1_1242
    } = props;

    return (
        <div
            className={["component-1_1238", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1238"
                className="Pixso-symbol-1_1238 pixso-relative-flex"
            >
                {slot_1_1239 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1239"
                            className="Pixso-instance-1_1239 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1240 ?? (
                    <p
                        id="1_1240"
                        className="Pixso-paragraph-1_1240 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1241 ??
                    (visible_4958_42 && (
                        <Typeaccentsizesmall
                            id="1_1241"
                            className="Pixso-instance-1_1241 pixso-relative-no-shrink"
                        ></Typeaccentsizesmall>
                    ))}
                {slot_1_1242 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1242"
                            className="Pixso-instance-1_1242 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typesubprimarystatepressedsizemedium;
