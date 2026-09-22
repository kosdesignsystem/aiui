import "@/styles/DarkModeyesthemegreentypewarningsizebig.css";
interface DarkModeyesthemegreentypewarningsizebigProps {
    id?: string;
    className?: string;
    slot_1_26876?: React.ReactNode;
}
const DarkModeyesthemegreentypewarningsizebig = (
    props: DarkModeyesthemegreentypewarningsizebigProps
) => {
    const { id, className = "", slot_1_26876 } = props;

    return (
        <div
            className={["component-1_26875", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26875"
                className="Pixso-symbol-1_26875 fill-systemwarning_primary-1_30133 pixso-relative-flex"
            >
                {slot_1_26876 ?? (
                    <p
                        id="1_26876"
                        className="Pixso-paragraph-1_26876 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypewarningsizebig;
