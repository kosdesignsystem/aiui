import "@/styles/Deletehistory.css";
interface DeletehistoryProps {
    visible_2356196488_3443909192?: boolean;
    is_outline?: string;
    id?: string;
    className?: string;
}
const Deletehistory = (props: DeletehistoryProps) => {
    const {
        visible_2356196488_3443909192 = true,
        is_outline,
        id,
        className = ""
    } = props;

    return (
        <div
            className={["component-1004_170666", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="1004_170666" className="Pixso-symbol-1004_170666">
                {is_outline === "false" && (
                    <div
                        id="1004_170667"
                        className="Pixso-symbol-1004_170667"
                    ></div>
                )}
                {is_outline === "true" && (
                    <div
                        id="1004_170669"
                        className="Pixso-symbol-1004_170669"
                    ></div>
                )}
            </div>
        </div>
    );
};
export default Deletehistory;
