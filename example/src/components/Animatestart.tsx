import Isoutlinefalse28 from "@/components/Isoutlinefalse28";
import "@/styles/Animatestart.css";
interface AnimatestartProps {
    id?: string;
    className?: string;
    slot_421_10540?: React.ReactNode;
}
const Animatestart = (props: AnimatestartProps) => {
    const { id, className = "", slot_421_10540 } = props;

    return (
        <div
            className={["component-421_10537", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10537"
                className="Pixso-symbol-421_10537 pixso-relative-flex"
            >
                <div id="421_10539" className="Pixso-rectangle-421_10539"></div>
                {slot_421_10540 ?? (
                    <Isoutlinefalse28
                        id="421_10540"
                        className="Pixso-instance-421_10540 pixso-relative-no-shrink"
                    ></Isoutlinefalse28>
                )}
            </div>
        </div>
    );
};
export default Animatestart;
