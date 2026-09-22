import Isoutlinetrue38 from "@/components/Isoutlinetrue38";
import Typeonaccentsizesmall from "@/components/Typeonaccentsizesmall";
import Chevronright0 from "@/components/Chevronright0";
import "@/styles/Typeprimarystatehoversizemedium.css";
interface TypeprimarystatehoversizemediumProps {
    visible_4958_0?: boolean;
    visible_4958_42?: boolean;
    visible_4958_84?: boolean;
    id?: string;
    className?: string;
    slot_1_1189?: React.ReactNode;
    slot_1_1190?: React.ReactNode;
    slot_1_1191?: React.ReactNode;
    slot_1_1192?: React.ReactNode;
}
const Typeprimarystatehoversizemedium = (
    props: TypeprimarystatehoversizemediumProps
) => {
    const {
        visible_4958_0 = false,
        visible_4958_42 = false,
        visible_4958_84 = false,
        id,
        className = "",
        slot_1_1189,
        slot_1_1190,
        slot_1_1191,
        slot_1_1192
    } = props;

    return (
        <div
            className={["component-1_1188", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_1188"
                className="Pixso-symbol-1_1188 pixso-relative-flex"
            >
                {slot_1_1189 ??
                    (visible_4958_0 && (
                        <Isoutlinetrue38
                            id="1_1189"
                            className="Pixso-instance-1_1189 pixso-relative-no-shrink"
                        ></Isoutlinetrue38>
                    ))}
                {slot_1_1190 ?? (
                    <p
                        id="1_1190"
                        className="Pixso-paragraph-1_1190 text-semibold14-1_10411 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"Button"}
                    </p>
                )}
                {slot_1_1191 ??
                    (visible_4958_42 && (
                        <Typeonaccentsizesmall
                            id="1_1191"
                            className="Pixso-instance-1_1191 pixso-relative-no-shrink"
                        ></Typeonaccentsizesmall>
                    ))}
                {slot_1_1192 ??
                    (visible_4958_84 && (
                        <Chevronright0
                            id="1_1192"
                            className="Pixso-instance-1_1192 pixso-relative-no-shrink"
                        ></Chevronright0>
                    ))}
            </div>
        </div>
    );
};
export default Typeprimarystatehoversizemedium;
