import "@/styles/Fullscreen1.css";
interface Fullscreen1Props {
    id?: string;
    className?: string;
}
const Fullscreen1 = (props: Fullscreen1Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-1854_490", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="1854_490" className="Pixso-symbol-1854_490"></div>
        </div>
    );
};
export default Fullscreen1;
