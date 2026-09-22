import "@/styles/Actionssetting0.css";
interface Actionssetting0Props {
    id?: string;
    className?: string;
}
const Actionssetting0 = (props: Actionssetting0Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-3001_9745", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9745"
                className="Pixso-symbol-3001_9745 pixso-position-relative"
            ></div>
        </div>
    );
};
export default Actionssetting0;
