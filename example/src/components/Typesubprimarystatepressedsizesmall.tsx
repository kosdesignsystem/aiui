import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeaccentsizesmall from "@/components/Typeaccentsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typesubprimarystatepressedsizesmall.css";
interface TypesubprimarystatepressedsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1244?: React.ReactNode;
    slot_1_1245?: React.ReactNode;
    slot_1_1246?: React.ReactNode;
    slot_1_1247?: React.ReactNode;
}
const Typesubprimarystatepressedsizesmall = (
    props: TypesubprimarystatepressedsizesmallProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1244,
        slot_1_1245,
        slot_1_1246,
        slot_1_1247
    } = props;

    return (
        <div
            className={["component-1_1243", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1243"
                className="Pixso-symbol-1_1243 pixso-relative-flex"
            >
                {slot_1_1244 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1244"
                            className="Pixso-instance-1_1244 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1245 ?? (
                    <p
                        id="1_1245"
                        className="Pixso-paragraph-1_1245 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1246 ??
                    (visible_4958_42 && (
                        <Typeaccentsizesmall
                            id="1_1246"
                            className="Pixso-instance-1_1246 pixso-relative-no-shrink"
                        ></Typeaccentsizesmall>
                    ))}
                {slot_1_1247 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1247"
                            className="Pixso-instance-1_1247 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typesubprimarystatepressedsizesmall;
