import Isoutlinefalse28 from "@/components/Isoutlinefalse28";
import "@/styles/Animateend.css";
interface AnimateendProps {
    id?: string;
    className?: string;
    slot_421_10542?: React.ReactNode;
}
const Animateend = (props: AnimateendProps) => {
    const { id, className = "", slot_421_10542 } = props;

    return (
        <div
            className={["component-421_10538", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10538"
                className="Pixso-symbol-421_10538 pixso-relative-flex"
            >
                <div id="421_10541" className="Pixso-rectangle-421_10541"></div>
                {slot_421_10542 ?? (
                    <Isoutlinefalse28
                        id="421_10542"
                        className="Pixso-instance-421_10542 pixso-relative-no-shrink"
                    ></Isoutlinefalse28>
                )}
            </div>
        </div>
    );
};
export default Animateend;
