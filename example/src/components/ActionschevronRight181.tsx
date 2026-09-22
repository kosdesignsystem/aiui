import "@/styles/ActionschevronRight181.css";
interface ActionschevronRight181Props {
    id?: string;
    className?: string;
}
const ActionschevronRight181 = (props: ActionschevronRight181Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-3001_9747", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3001_9747"
                className="Pixso-symbol-3001_9747 pixso-position-relative"
            ></div>
        </div>
    );
};
export default ActionschevronRight181;
