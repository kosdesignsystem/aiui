import Background from "@/components/Background";
import PageIndicator from "@/components/Pageindicator";
import "@/styles/Orientationportrait.css";
interface OrientationportraitProps {
    visible_8606_5?: boolean;
    id?: string;
    className?: string;
    slot_3008_19687?: React.ReactNode;
    slot_3008_19688?: React.ReactNode;
}
const Orientationportrait = (props: OrientationportraitProps) => {
    const {
        visible_8606_5 = true,
        id,
        className = "",
        slot_3008_19687,
        slot_3008_19688
    } = props;

    return (
        <div
            className={["component-3008_19683", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div
                id="3008_19683"
                className="Pixso-symbol-3008_19683 pixso-position-relative"
            >
                {visible_8606_5 && (
                    <div id="3008_19684" className="Pixso-group-3008_19684">
                        <div id="3008_19686" className="Pixso-frame-3008_19686">
                            {slot_3008_19687 ?? (
                                <Background
                                    id="3008_19687"
                                    className="Pixso-instance-3008_19687"
                                    __pixsoClassOverrides={{
                                        ["overrideClass_3008_19678"]: [
                                            "fill-reef-darkprimary-inversion-3008_19674"
                                        ]
                                    }}
                                ></Background>
                            )}
                        </div>
                    </div>
                )}
                {slot_3008_19688 ?? (
                    <PageIndicator
                        id="3008_19688"
                        className="Pixso-instance-3008_19688"
                        __pixsoClassOverrides={{
                            ["overrideClass_3008_19681"]: [
                                "fill-reef-darkprimary-3008_19679"
                            ],
                            ["overrideStrokeClass_3008_19681"]: [
                                "stroke-reef-darkprimary-3008_19679"
                            ]
                        }}
                    ></PageIndicator>
                )}
            </div>
        </div>
    );
};
export default Orientationportrait;
