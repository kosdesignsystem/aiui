import "@/styles/Avia24.css";
interface Avia24Props {
    id?: string;
    className?: string;
}
const Avia24 = (props: Avia24Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-421_10523", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_10523"
                className="Pixso-symbol-421_10523 pixso-position-relative"
            ></div>
        </div>
    );
};
export default Avia24;
