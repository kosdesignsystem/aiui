import "@/styles/Rec1.css";
interface Rec1Props {
    id?: string;
    className?: string;
}
const Rec1 = (props: Rec1Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-1854_510", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="1854_510" className="Pixso-symbol-1854_510"></div>
        </div>
    );
};
export default Rec1;
