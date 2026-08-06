import Settings from "@/components/Settings";
import "@/styles/Buttoniconnogreendefaultmediumdefault.css";
interface ButtoniconnogreendefaultmediumdefaultProps {
    instance_5019_51?: string;
    id?: string;
    className?: string;
    slot_894_155460?: React.ReactNode;
}
const Buttoniconnogreendefaultmediumdefault = (
    props: ButtoniconnogreendefaultmediumdefaultProps
) => {
    const {
        instance_5019_51 = "Component_504_2219",
        id,
        className = "",
        slot_894_155460
    } = props;

    return (
        <div
            className={["component-894_155459", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="894_155459" className="Pixso-symbol-894_155459">
                {slot_894_155460 ?? (
                    <Settings
                        id="894_155460"
                        className="Pixso-instance-894_155460"
                        is_outline="false"
                    ></Settings>
                )}
            </div>
        </div>
    );
};
export default Buttoniconnogreendefaultmediumdefault;
