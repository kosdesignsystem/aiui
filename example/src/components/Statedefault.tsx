import Isoutlinefalse28 from "@/components/Isoutlinefalse28";
import "@/styles/Statedefault.css";
interface StatedefaultProps {
    id?: string;
    className?: string;
    slot_421_10550?: React.ReactNode;
    slot_421_10551?: React.ReactNode;
}
const Statedefault = (props: StatedefaultProps) => {
    const { id, className = "", slot_421_10550, slot_421_10551 } = props;

    return (
        <div
            className={["component-421_10545", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10545"
                className="Pixso-symbol-421_10545 pixso-relative-flex"
            >
                {slot_421_10550 ?? (
                    <Isoutlinefalse28
                        id="421_10550"
                        className="Pixso-instance-421_10550 pixso-relative-no-shrink"
                    ></Isoutlinefalse28>
                )}
                {slot_421_10551 ?? (
                    <p
                        id="421_10551"
                        className="Pixso-paragraph-421_10551 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"00:45"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default Statedefault;
