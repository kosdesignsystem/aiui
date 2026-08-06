import "@/styles/Close2.css";
interface Close2Props {
    id?: string;
    className?: string;
}
const Close2 = (props: Close2Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-431_165251", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="431_165251" className="Pixso-symbol-431_165251"></div>
        </div>
    );
};
export default Close2;
