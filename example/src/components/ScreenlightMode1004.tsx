import "@/styles/ScreenlightMode1004.css";
interface ScreenlightMode1004Props {
    id?: string;
    className?: string;
}
const ScreenlightMode1004 = (props: ScreenlightMode1004Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-3001_9741", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9741"
                className="Pixso-symbol-3001_9741 pixso-position-relative"
            ></div>
        </div>
    );
};
export default ScreenlightMode1004;
