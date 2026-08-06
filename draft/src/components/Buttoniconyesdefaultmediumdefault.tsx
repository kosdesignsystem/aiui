import Settings from "@/components/Settings";
import "@/styles/Buttoniconyesdefaultmediumdefault.css";
interface ButtoniconyesdefaultmediumdefaultProps {
    instance_5019_53?: string;
    id?: string;
    className?: string;
    slot_894_155468?: React.ReactNode;
}
const Buttoniconyesdefaultmediumdefault = (
    props: ButtoniconyesdefaultmediumdefaultProps
) => {
    const {
        instance_5019_53 = "Component_504_2219",
        id,
        className = "",
        slot_894_155468
    } = props;

    return (
        <div
            className={["component-894_155467", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="894_155467" className="Pixso-symbol-894_155467">
                {slot_894_155468 ?? (
                    <Settings
                        id="894_155468"
                        className="Pixso-instance-894_155468"
                        is_outline="false"
                    ></Settings>
                )}
            </div>
        </div>
    );
};
export default Buttoniconyesdefaultmediumdefault;
