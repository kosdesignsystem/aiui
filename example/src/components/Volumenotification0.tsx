import "@/styles/Volumenotification0.css";
interface Volumenotification0Props {
    id?: string;
    className?: string;
}
const Volumenotification0 = (props: Volumenotification0Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-3001_9734", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9734"
                className="Pixso-symbol-3001_9734 pixso-position-relative"
            ></div>
        </div>
    );
};
export default Volumenotification0;
