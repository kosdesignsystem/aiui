import "@/styles/DarkModenothemegreentypedefaultsizebig.css";
interface DarkModenothemegreentypedefaultsizebigProps {
    id?: string;
    className?: string;
    slot_1_26891?: React.ReactNode;
}
const DarkModenothemegreentypedefaultsizebig = (
    props: DarkModenothemegreentypedefaultsizebigProps
) => {
    const { id, className = "", slot_1_26891 } = props;

    return (
        <div
            className={["component-1_26890", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26890"
                className="Pixso-symbol-1_26890 fill-light_backgroundbg_0-1_30126 pixso-relative-flex"
            >
                {slot_1_26891 ?? (
                    <p
                        id="1_26891"
                        className="Pixso-paragraph-1_26891 fill-light_contentprimary-1_10528-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypedefaultsizebig;
