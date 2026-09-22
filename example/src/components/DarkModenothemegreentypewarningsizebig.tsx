import "@/styles/DarkModenothemegreentypewarningsizebig.css";
interface DarkModenothemegreentypewarningsizebigProps {
    id?: string;
    className?: string;
    slot_1_26872?: React.ReactNode;
}
const DarkModenothemegreentypewarningsizebig = (
    props: DarkModenothemegreentypewarningsizebigProps
) => {
    const { id, className = "", slot_1_26872 } = props;

    return (
        <div
            className={["component-1_26871", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26871"
                className="Pixso-symbol-1_26871 fill-systemwarning_primary-1_30133 pixso-relative-flex"
            >
                {slot_1_26872 ?? (
                    <p
                        id="1_26872"
                        className="Pixso-paragraph-1_26872 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypewarningsizebig;
