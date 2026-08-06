import "@/styles/Add0.css";
interface Add0Props {
    id?: string;
    className?: string;
}
const Add0 = (props: Add0Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-767_155055", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="767_155055" className="Pixso-symbol-767_155055"></div>
        </div>
    );
};
export default Add0;
