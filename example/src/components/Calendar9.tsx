import "@/styles/Calendar9.css";
interface Calendar9Props {
    id?: string;
    className?: string;
}
const Calendar9 = (props: Calendar9Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-1_10263", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_10263"
                className="Pixso-symbol-1_10263 pixso-position-relative"
            ></div>
        </div>
    );
};
export default Calendar9;
