import Settings from "@/components/Settings";
import "@/styles/Buttoniconyesbluedefaultmediumdefault.css";
interface ButtoniconyesbluedefaultmediumdefaultProps {
    instance_5019_49?: string;
    id?: string;
    className?: string;
    slot_894_155464?: React.ReactNode;
}
const Buttoniconyesbluedefaultmediumdefault = (
    props: ButtoniconyesbluedefaultmediumdefaultProps
) => {
    const {
        instance_5019_49 = "Component_504_2219",
        id,
        className = "",
        slot_894_155464
    } = props;

    return (
        <div
            className={["component-894_155463", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="894_155463" className="Pixso-symbol-894_155463">
                {slot_894_155464 ?? (
                    <Settings
                        id="894_155464"
                        className="Pixso-instance-894_155464"
                        is_outline="false"
                    ></Settings>
                )}
            </div>
        </div>
    );
};
export default Buttoniconyesbluedefaultmediumdefault;
