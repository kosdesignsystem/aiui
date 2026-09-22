import "@/styles/ScreenlightMode04.css";
interface ScreenlightMode04Props {
    id?: string;
    className?: string;
}
const ScreenlightMode04 = (props: ScreenlightMode04Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-3001_9743", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9743"
                className="Pixso-symbol-3001_9743 pixso-position-relative"
            ></div>
        </div>
    );
};
export default ScreenlightMode04;
