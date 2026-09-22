import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeaccentsizesmall from "@/components/Typeaccentsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typesubprimarystatedefaultsizesmall.css";
interface TypesubprimarystatedefaultsizesmallProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1219?: React.ReactNode;
    slot_1_1220?: React.ReactNode;
    slot_1_1221?: React.ReactNode;
    slot_1_1222?: React.ReactNode;
}
const Typesubprimarystatedefaultsizesmall = (
    props: TypesubprimarystatedefaultsizesmallProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1219,
        slot_1_1220,
        slot_1_1221,
        slot_1_1222
    } = props;

    return (
        <div
            className={["component-1_1218", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1218"
                className="Pixso-symbol-1_1218 pixso-relative-flex"
            >
                {slot_1_1219 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1219"
                            className="Pixso-instance-1_1219 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1220 ?? (
                    <p
                        id="1_1220"
                        className="Pixso-paragraph-1_1220 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1221 ??
                    (visible_4958_42 && (
                        <Typeaccentsizesmall
                            id="1_1221"
                            className="Pixso-instance-1_1221 pixso-relative-no-shrink"
                        ></Typeaccentsizesmall>
                    ))}
                {slot_1_1222 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1222"
                            className="Pixso-instance-1_1222 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typesubprimarystatedefaultsizesmall;
