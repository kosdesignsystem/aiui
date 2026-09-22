import "@/styles/DarkModenothemegreentypedefaultsizesmall.css";
interface DarkModenothemegreentypedefaultsizesmallProps {
    id?: string;
    className?: string;
    slot_1_26978?: React.ReactNode;
}
const DarkModenothemegreentypedefaultsizesmall = (
    props: DarkModenothemegreentypedefaultsizesmallProps
) => {
    const { id, className = "", slot_1_26978 } = props;

    return (
        <div
            className={["component-1_26977", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26977"
                className="Pixso-symbol-1_26977 fill-light_backgroundbg_0-1_30126 pixso-relative-flex"
            >
                {slot_1_26978 ?? (
                    <p
                        id="1_26978"
                        className="Pixso-paragraph-1_26978 fill-light_contentprimary-1_10528-paragraph text-semibold12-1_10437 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"9"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModenothemegreentypedefaultsizesmall;
