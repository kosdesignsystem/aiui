import "@/styles/Statusinfo180.css";
interface Statusinfo180Props {
    id?: string;
    className?: string;
}
const Statusinfo180 = (props: Statusinfo180Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-3001_9749", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9749"
                className="Pixso-symbol-3001_9749 pixso-position-relative"
            ></div>
        </div>
    );
};
export default Statusinfo180;
