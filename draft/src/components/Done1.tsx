import "@/styles/Done1.css";
interface Done1Props {
    id?: string;
    className?: string;
}
const Done1 = (props: Done1Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-431_163981", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="431_163981" className="Pixso-symbol-431_163981"></div>
        </div>
    );
};
export default Done1;
