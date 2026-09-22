import "@/styles/ActionschevronRight212.css";
interface ActionschevronRight212Props {
    id?: string;
    className?: string;
}
const ActionschevronRight212 = (props: ActionschevronRight212Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-1_26999", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26999"
                className="Pixso-symbol-1_26999 pixso-position-relative"
            ></div>
        </div>
    );
};
export default ActionschevronRight212;
