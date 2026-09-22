import Isoutlinefalse25 from "@/components/Isoutlinefalse25";
import "@/styles/Statefinish.css";
interface StatefinishProps {
    id?: string;
    className?: string;
    slot_421_10552?: React.ReactNode;
    slot_421_10553?: React.ReactNode;
}
const Statefinish = (props: StatefinishProps) => {
    const { id, className = "", slot_421_10552, slot_421_10553 } = props;

    return (
        <div
            className={["component-421_10546", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10546"
                className="Pixso-symbol-421_10546 pixso-relative-flex"
            >
                {slot_421_10552 ?? (
                    <Isoutlinefalse25
                        id="421_10552"
                        className="Pixso-instance-421_10552 pixso-relative-no-shrink"
                    ></Isoutlinefalse25>
                )}
                {slot_421_10553 ?? (
                    <p
                        id="421_10553"
                        className="Pixso-paragraph-421_10553 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"00:45"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default Statefinish;
