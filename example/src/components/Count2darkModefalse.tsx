import Isoutlinefalse31 from "@/components/Isoutlinefalse31";
import Isoutlinefalse30 from "@/components/Isoutlinefalse30";
import "@/styles/Count2darkModefalse.css";
interface Count2darkModefalseProps {
    id?: string;
    className?: string;
    slot_421_9796?: React.ReactNode;
    slot_421_9797?: React.ReactNode;
}
const Count2darkModefalse = (props: Count2darkModefalseProps) => {
    const { id, className = "", slot_421_9796, slot_421_9797 } = props;

    return (
        <div
            className={["component-421_9795", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_9795"
                className="Pixso-symbol-421_9795 pixso-relative-flex"
            >
                {slot_421_9796 ?? (
                    <Isoutlinefalse31
                        id="421_9796"
                        className="Pixso-instance-421_9796 pixso-relative-no-shrink"
                    ></Isoutlinefalse31>
                )}
                {slot_421_9797 ?? (
                    <Isoutlinefalse30
                        id="421_9797"
                        className="Pixso-instance-421_9797 pixso-relative-no-shrink"
                    ></Isoutlinefalse30>
                )}
            </div>
        </div>
    );
};
export default Count2darkModefalse;
