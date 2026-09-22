import "@/styles/Batterychargefull1.css";
interface Batterychargefull1Props {
    id?: string;
    className?: string;
}
const Batterychargefull1 = (props: Batterychargefull1Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-421_9813", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="421_9813"
                className="Pixso-symbol-421_9813 pixso-position-relative"
            ></div>
        </div>
    );
};
export default Batterychargefull1;
