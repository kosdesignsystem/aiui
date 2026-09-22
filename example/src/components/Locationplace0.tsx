import "@/styles/Locationplace0.css";
interface Locationplace0Props {
    id?: string;
    className?: string;
}
const Locationplace0 = (props: Locationplace0Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-3001_9732", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9732"
                className="Pixso-symbol-3001_9732 pixso-position-relative"
            ></div>
        </div>
    );
};
export default Locationplace0;
