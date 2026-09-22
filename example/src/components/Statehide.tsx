import Isoutlinefalse23 from "@/components/Isoutlinefalse23";
import "@/styles/Statehide.css";
interface StatehideProps {
    id?: string;
    className?: string;
    slot_421_10564?: React.ReactNode;
}
const Statehide = (props: StatehideProps) => {
    const { id, className = "", slot_421_10564 } = props;

    return (
        <div
            className={["component-421_10562", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10562"
                className="Pixso-symbol-421_10562 pixso-relative-flex"
            >
                {slot_421_10564 ?? (
                    <Isoutlinefalse23
                        id="421_10564"
                        className="Pixso-instance-421_10564 pixso-relative-no-shrink"
                    ></Isoutlinefalse23>
                )}
            </div>
        </div>
    );
};
export default Statehide;
