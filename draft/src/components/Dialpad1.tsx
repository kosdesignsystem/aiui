import "@/styles/Dialpad1.css";
interface Dialpad1Props {
    id?: string;
    className?: string;
}
const Dialpad1 = (props: Dialpad1Props) => {
    const { id, className = "" } = props;

    return (
        <div
            className={["component-445_139036", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="445_139036" className="Pixso-symbol-445_139036"></div>
        </div>
    );
};
export default Dialpad1;
