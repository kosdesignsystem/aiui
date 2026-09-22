import "@/styles/DarkModeyesthemegreentypeaccentsizebig.css";
interface DarkModeyesthemegreentypeaccentsizebigProps {
    id?: string;
    className?: string;
    slot_1_26832?: React.ReactNode;
}
const DarkModeyesthemegreentypeaccentsizebig = (
    props: DarkModeyesthemegreentypeaccentsizebigProps
) => {
    const { id, className = "", slot_1_26832 } = props;

    return (
        <div
            className={["component-1_26831", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26831"
                className="Pixso-symbol-1_26831 fill-greenprimary-1_30120 pixso-relative-flex"
            >
                {slot_1_26832 ?? (
                    <p
                        id="1_26832"
                        className="Pixso-paragraph-1_26832 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypeaccentsizebig;
