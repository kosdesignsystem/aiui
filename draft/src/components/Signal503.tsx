import "@/styles/Signal503.css";
interface Signal503Props {
    id?: string;
    className?: string;
}
const Signal503 = (props: Signal503Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-333_130375", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="333_130375" className="Pixso-symbol-333_130375"></div>
        </div>
    );
};
export default Signal503;
