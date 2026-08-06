import Settings0 from "@/components/Settings0";
import "@/styles/Buttoniconnogreendefaultmediumdefault0.css";
interface Buttoniconnogreendefaultmediumdefault0Props {
    instance_5019_51?: string;
    id?: string;
    className?: string;
    slot_1057_169910?: React.ReactNode;
}
const Buttoniconnogreendefaultmediumdefault0 = (
    props: Buttoniconnogreendefaultmediumdefault0Props
) => {
    const {
        instance_5019_51 = "Component_188_119799",
        id,
        className = "",
        slot_1057_169910
    } = props;

    return (
        <div
            className={["component-1057_169909", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="1057_169909" className="Pixso-symbol-1057_169909">
                {slot_1057_169910 ?? (
                    <Settings0
                        id="1057_169910"
                        className="Pixso-instance-1057_169910"
                        is_outline="false"
                    ></Settings0>
                )}
            </div>
        </div>
    );
};
export default Buttoniconnogreendefaultmediumdefault0;
