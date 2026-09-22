import "@/styles/DarkModeyesthemegreentypeonAccentsizebig.css";
interface DarkModeyesthemegreentypeonAccentsizebigProps {
    id?: string;
    className?: string;
    slot_1_26844?: React.ReactNode;
}
const DarkModeyesthemegreentypeonAccentsizebig = (
    props: DarkModeyesthemegreentypeonAccentsizebigProps
) => {
    const { id, className = "", slot_1_26844 } = props;

    return (
        <div
            className={["component-1_26843", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26843"
                className="Pixso-symbol-1_26843 fill-dark_contentprimary-1_10529 pixso-relative-flex"
            >
                {slot_1_26844 ?? (
                    <p
                        id="1_26844"
                        className="Pixso-paragraph-1_26844 fill-greenprimary-1_30120-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypeonAccentsizebig;
