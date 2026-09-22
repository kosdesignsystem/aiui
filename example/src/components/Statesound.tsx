import Isoutlinefalse26 from "@/components/Isoutlinefalse26";
import "@/styles/Statesound.css";
interface StatesoundProps {
    id?: string;
    className?: string;
    slot_421_10548?: React.ReactNode;
    slot_421_10549?: React.ReactNode;
}
const Statesound = (props: StatesoundProps) => {
    const { id, className = "", slot_421_10548, slot_421_10549 } = props;

    return (
        <div
            className={["component-421_10544", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10544"
                className="Pixso-symbol-421_10544 pixso-relative-flex"
            >
                {slot_421_10548 ?? (
                    <Isoutlinefalse26
                        id="421_10548"
                        className="Pixso-instance-421_10548 pixso-relative-no-shrink"
                    ></Isoutlinefalse26>
                )}
                {slot_421_10549 ?? (
                    <p
                        id="421_10549"
                        className="Pixso-paragraph-421_10549 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"00:45"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default Statesound;
