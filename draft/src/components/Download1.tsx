import "@/styles/Download1.css";
interface Download1Props {
    id?: string;
    className?: string;
}
const Download1 = (props: Download1Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-1854_493", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="1854_493" className="Pixso-symbol-1854_493"></div>
        </div>
    );
};
export default Download1;
