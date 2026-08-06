import "@/styles/Arrowleft1.css";
interface Arrowleft1Props {
    id?: string;
    className?: string;
}
const Arrowleft1 = (props: Arrowleft1Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-1862_158015", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="1862_158015" className="Pixso-symbol-1862_158015"></div>
        </div>
    );
};
export default Arrowleft1;
