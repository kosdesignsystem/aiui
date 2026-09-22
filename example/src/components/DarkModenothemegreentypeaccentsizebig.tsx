import "@/styles/DarkModenothemegreentypeaccentsizebig.css";
interface DarkModenothemegreentypeaccentsizebigProps {
    id?: string;
    className?: string;
    slot_1_26830?: React.ReactNode;
}
const DarkModenothemegreentypeaccentsizebig = (
    props: DarkModenothemegreentypeaccentsizebigProps
) => {
    const { id, className = "", slot_1_26830 } = props;

    return (
        <div
            className={["component-1_26829", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26829"
                className="Pixso-symbol-1_26829 fill-greenprimary-1_30120 pixso-relative-flex"
            >
                {slot_1_26830 ?? (
                    <p
                        id="1_26830"
                        className="Pixso-paragraph-1_26830 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypeaccentsizebig;
