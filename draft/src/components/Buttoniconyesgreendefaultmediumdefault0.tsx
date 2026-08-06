import Settings0 from "@/components/Settings0";
import "@/styles/Buttoniconyesgreendefaultmediumdefault0.css";
interface Buttoniconyesgreendefaultmediumdefault0Props {
    instance_5019_51?: string;
    id?: string;
    className?: string;
    slot_1057_169893?: React.ReactNode;
}
const Buttoniconyesgreendefaultmediumdefault0 = (
    props: Buttoniconyesgreendefaultmediumdefault0Props
) => {
    const {
        instance_5019_51 = "Component_188_119799",
        id,
        className = "",
        slot_1057_169893
    } = props;

    return (
        <div
            className={["component-1057_169892", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="1057_169892" className="Pixso-symbol-1057_169892">
                {slot_1057_169893 ?? (
                    <Settings0
                        id="1057_169893"
                        className="Pixso-instance-1057_169893"
                        is_outline="false"
                    ></Settings0>
                )}
            </div>
        </div>
    );
};
export default Buttoniconyesgreendefaultmediumdefault0;
