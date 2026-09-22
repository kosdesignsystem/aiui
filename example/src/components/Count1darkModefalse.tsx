import Isoutlinefalse31 from "@/components/Isoutlinefalse31";
import "@/styles/Count1darkModefalse.css";
interface Count1darkModefalseProps {
    id?: string;
    className?: string;
    slot_421_9799?: React.ReactNode;
}
const Count1darkModefalse = (props: Count1darkModefalseProps) => {
    const { id, className = "", slot_421_9799 } = props;

    return (
        <div
            className={["component-421_9798", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_9798"
                className="Pixso-symbol-421_9798 pixso-relative-flex"
            >
                {slot_421_9799 ?? (
                    <Isoutlinefalse31
                        id="421_9799"
                        className="Pixso-instance-421_9799 pixso-relative-no-shrink"
                    ></Isoutlinefalse31>
                )}
            </div>
        </div>
    );
};
export default Count1darkModefalse;
