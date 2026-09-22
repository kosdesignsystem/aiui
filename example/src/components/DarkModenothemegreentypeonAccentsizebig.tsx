import "@/styles/DarkModenothemegreentypeonAccentsizebig.css";
interface DarkModenothemegreentypeonAccentsizebigProps {
    id?: string;
    className?: string;
    slot_1_26842?: React.ReactNode;
}
const DarkModenothemegreentypeonAccentsizebig = (
    props: DarkModenothemegreentypeonAccentsizebigProps
) => {
    const { id, className = "", slot_1_26842 } = props;

    return (
        <div
            className={["component-1_26841", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26841"
                className="Pixso-symbol-1_26841 fill-dark_contentprimary-1_10529 pixso-relative-flex"
            >
                {slot_1_26842 ?? (
                    <p
                        id="1_26842"
                        className="Pixso-paragraph-1_26842 fill-greenprimary-1_30120-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypeonAccentsizebig;
