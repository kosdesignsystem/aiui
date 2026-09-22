import Animatestart from "@/components/Animatestart";
import "@/styles/Statecalling.css";
interface StatecallingProps {
    id?: string;
    className?: string;
    slot_421_10554?: React.ReactNode;
}
const Statecalling = (props: StatecallingProps) => {
    const { id, className = "", slot_421_10554 } = props;

    return (
        <div
            className={["component-421_10547", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10547"
                className="Pixso-symbol-421_10547 pixso-relative-flex"
            >
                {slot_421_10554 ?? (
                    <Animatestart
                        id="421_10554"
                        className="Pixso-instance-421_10554 pixso-relative-no-shrink"
                        slot_421_10540={
                            <div
                                id="421_10540"
                                className="Pixso-instance-421_10540 pixso-relative-no-shrink"
                            ></div>
                        }
                    ></Animatestart>
                )}
            </div>
        </div>
    );
};
export default Statecalling;
