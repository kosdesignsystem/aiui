import Settings from "@/components/Settings";
import "@/styles/Buttoniconyesgreendefaultmediumdefault.css";
interface ButtoniconyesgreendefaultmediumdefaultProps {
    instance_5019_51?: string;
    id?: string;
    className?: string;
    slot_894_155466?: React.ReactNode;
}
const Buttoniconyesgreendefaultmediumdefault = (
    props: ButtoniconyesgreendefaultmediumdefaultProps
) => {
    const {
        instance_5019_51 = "Component_504_2219",
        id,
        className = "",
        slot_894_155466
    } = props;

    return (
        <div
            className={["component-894_155465", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="894_155465" className="Pixso-symbol-894_155465">
                {slot_894_155466 ?? (
                    <Settings
                        id="894_155466"
                        className="Pixso-instance-894_155466"
                        is_outline="false"
                    ></Settings>
                )}
            </div>
        </div>
    );
};
export default Buttoniconyesgreendefaultmediumdefault;
