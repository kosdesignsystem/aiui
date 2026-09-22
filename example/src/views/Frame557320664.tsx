import { useNavigate } from "react-router";
import { getPathByGuid } from "@/router/routes";
import { withStopPropagation } from "@/utils/utils";
import StatusBarlocal from "@/components/Statusbarlocal";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import Backbackdarkmodefalse from "@/components/Backbackdarkmodefalse";
import "@/styles/Frame557320664.css";
const Frame557320664 = () => {
    const navigate = useNavigate();

    const drag_5573_20711 = () => {
        navigate(getPathByGuid("5573:22677"), {
            state: {
                from: "5573:20711",
                et: "dg"
            }
        });
    };

    const drag_5573_20755_421_11156_3212_15399 = () => {
        navigate(getPathByGuid("5573:21997"), {
            state: {
                from: "5573:20755_421:11156_3212:15399",
                et: "dg"
            }
        });
    };

    return (
        <div className="scroll-container">
            <div
                id="5573_20664"
                className="Pixso-frame-5573_20664 pixso-relative-no-shrink"
            >
                <div
                    id="5573_20665"
                    className="Pixso-rectangle-5573_20665"
                ></div>
                <div
                    id="5573_20666"
                    className="Pixso-rectangle-5573_20666"
                ></div>
                <div
                    id="5573_20667"
                    className="Pixso-rectangle-5573_20667"
                ></div>
                <div
                    id="5573_20711"
                    className="Pixso-frame-5573_20711"
                    onDrag={withStopPropagation(drag_5573_20711)}
                ></div>
                <StatusBarlocal
                    id="5573_20754"
                    className="Pixso-instance-5573_20754"
                    slot_3007_9528={
                        <div
                            id="461_39305"
                            className="Pixso-instance-461_39305 pixso-relative-no-shrink"
                        ></div>
                    }
                    slot_3007_9527={
                        <div
                            id="461_39302"
                            className="Pixso-instance-461_39302 pixso-relative-no-shrink"
                        ></div>
                    }
                    slot_5222_17195={
                        <div
                            id="461_39285"
                            className="Pixso-vector-461_39285"
                        ></div>
                    }
                    slot_3007_9529={
                        <Darkmodefalseischargingtruechargecount8
                            id="461_39308"
                            className="Pixso-instance-461_39308 pixso-relative-no-shrink"
                            slot_421_9829={
                                <div
                                    id="461_39309"
                                    className="Pixso-instance-461_39309 pixso-relative-no-shrink"
                                ></div>
                            }
                            slot_421_9830={
                                <p
                                    id="461_39312"
                                    className="Pixso-paragraph-461_39312 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                >
                                    {"98%"}
                                </p>
                            }
                        ></Darkmodefalseischargingtruechargecount8>
                    }
                    slot_3007_9524={
                        <p
                            id="461_39295"
                            className="Pixso-paragraph-461_39295 text-medium14-429_12783 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"13:01"}
                        </p>
                    }
                ></StatusBarlocal>
                <Backbackdarkmodefalse
                    id="5573_20755"
                    className="Pixso-instance-5573_20755"
                    onDrag5573_20755421_111563212_15399={withStopPropagation(
                        drag_5573_20755_421_11156_3212_15399
                    )}
                    slot_421_11171={
                        <div
                            id="461_31259"
                            className="Pixso-vector-461_31259"
                        ></div>
                    }
                ></Backbackdarkmodefalse>
            </div>
        </div>
    );
};
export default Frame557320664;
