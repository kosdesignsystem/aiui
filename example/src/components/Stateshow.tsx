import Isoutlinefalse23 from "@/components/Isoutlinefalse23";
import "@/styles/Stateshow.css";
interface StateshowProps {
    id?: string;
    className?: string;
    slot_421_10565?: React.ReactNode;
    slot_421_10566?: React.ReactNode;
}
const Stateshow = (props: StateshowProps) => {
    const { id, className = "", slot_421_10565, slot_421_10566 } = props;

    return (
        <div
            className={["component-421_10563", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10563"
                className="Pixso-symbol-421_10563 pixso-relative-flex"
            >
                {slot_421_10565 ?? (
                    <Isoutlinefalse23
                        id="421_10565"
                        className="Pixso-instance-421_10565 pixso-relative-no-shrink"
                    ></Isoutlinefalse23>
                )}
                {slot_421_10566 ?? (
                    <p
                        id="421_10566"
                        className="Pixso-paragraph-421_10566 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"00:45:23"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default Stateshow;
