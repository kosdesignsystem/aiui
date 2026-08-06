import Settings0 from "@/components/Settings0";
import "@/styles/Buttoniconnopurpledefaultmediumdefault0.css";
interface Buttoniconnopurpledefaultmediumdefault0Props {
    instance_5019_53?: string;
    id?: string;
    className?: string;
    slot_1057_169908?: React.ReactNode;
}
const Buttoniconnopurpledefaultmediumdefault0 = (
    props: Buttoniconnopurpledefaultmediumdefault0Props
) => {
    const {
        instance_5019_53 = "Component_188_119799",
        id,
        className = "",
        slot_1057_169908
    } = props;

    return (
        <div
            className={["component-1057_169907", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="1057_169907" className="Pixso-symbol-1057_169907">
                {slot_1057_169908 ?? (
                    <Settings0
                        id="1057_169908"
                        className="Pixso-instance-1057_169908"
                        is_outline="false"
                    ></Settings0>
                )}
            </div>
        </div>
    );
};
export default Buttoniconnopurpledefaultmediumdefault0;
