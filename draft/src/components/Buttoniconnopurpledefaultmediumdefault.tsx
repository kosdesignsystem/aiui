import Settings from "@/components/Settings";
import "@/styles/Buttoniconnopurpledefaultmediumdefault.css";
interface ButtoniconnopurpledefaultmediumdefaultProps {
    instance_5019_53?: string;
    id?: string;
    className?: string;
    slot_894_155462?: React.ReactNode;
}
const Buttoniconnopurpledefaultmediumdefault = (
    props: ButtoniconnopurpledefaultmediumdefaultProps
) => {
    const {
        instance_5019_53 = "Component_504_2219",
        id,
        className = "",
        slot_894_155462
    } = props;

    return (
        <div
            className={["component-894_155461", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="894_155461" className="Pixso-symbol-894_155461">
                {slot_894_155462 ?? (
                    <Settings
                        id="894_155462"
                        className="Pixso-instance-894_155462"
                        is_outline="false"
                    ></Settings>
                )}
            </div>
        </div>
    );
};
export default Buttoniconnopurpledefaultmediumdefault;
