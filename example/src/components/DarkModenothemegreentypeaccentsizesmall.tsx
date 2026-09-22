import "@/styles/DarkModenothemegreentypeaccentsizesmall.css";
interface DarkModenothemegreentypeaccentsizesmallProps {
    id?: string;
    className?: string;
    slot_1_26917?: React.ReactNode;
}
const DarkModenothemegreentypeaccentsizesmall = (
    props: DarkModenothemegreentypeaccentsizesmallProps
) => {
    const { id, className = "", slot_1_26917 } = props;

    return (
        <div
            className={["component-1_26916", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26916"
                className="Pixso-symbol-1_26916 fill-greenprimary-1_30120 pixso-relative-flex"
            >
                {slot_1_26917 ?? (
                    <p
                        id="1_26917"
                        className="Pixso-paragraph-1_26917 fill-dark_contentprimary-1_10529-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypeaccentsizesmall;
