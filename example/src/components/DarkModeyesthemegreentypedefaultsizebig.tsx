import "@/styles/DarkModeyesthemegreentypedefaultsizebig.css";
interface DarkModeyesthemegreentypedefaultsizebigProps {
    id?: string;
    className?: string;
    slot_1_26894?: React.ReactNode;
}
const DarkModeyesthemegreentypedefaultsizebig = (
    props: DarkModeyesthemegreentypedefaultsizebigProps
) => {
    const { id, className = "", slot_1_26894 } = props;

    return (
        <div
            className={["component-1_26892", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="1_26892"
                className="Pixso-symbol-1_26892 fill-dark_backgroundbg_0-1_30127 pixso-relative-flex"
            >
                <div
                    id="1_26893"
                    className="Pixso-rectangle-1_26893 fill-dark_contentplashka-1_30095"
                ></div>
                {slot_1_26894 ?? (
                    <p
                        id="1_26894"
                        className="Pixso-paragraph-1_26894 fill-dark_contentprimary-1_10529-paragraph text-semibold14-1_30130 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        {"91"}
                    </p>
                )}
            </div>
        </div>
    );
};
export default DarkModeyesthemegreentypedefaultsizebig;
