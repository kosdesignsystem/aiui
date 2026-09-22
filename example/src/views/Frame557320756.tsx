import StatusBarlocal from "@/components/Statusbarlocal";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import Backbackdarkmodefalse from "@/components/Backbackdarkmodefalse";
import { useNavigate } from "react-router";
import { getPathByGuid } from "@/router/routes";
import { withStopPropagation } from "@/utils/utils";
import "@/styles/Frame557320756.css";
const Frame557320756 = () => {
    const navigate = useNavigate();

    const drag_5573_20804_421_11156_3212_15399 = () => {
        navigate(getPathByGuid("5573:21997"), {
            state: {
                from: "5573:20804_421:11156_3212:15399",
                et: "dg"
            }
        });
    };

    return (
        <div className="scroll-container">
            <div
                id="5573_20756"
                className="Pixso-frame-5573_20756 pixso-relative-no-shrink"
            >
                <div
                    id="5573_20757"
                    className="Pixso-rectangle-5573_20757"
                ></div>
                <div
                    id="5573_20758"
                    className="Pixso-rectangle-5573_20758"
                ></div>
                <div
                    id="5573_20759"
                    className="Pixso-rectangle-5573_20759"
                ></div>
                <StatusBarlocal
                    id="5573_20803"
                    className="Pixso-instance-5573_20803"
                    slot_3007_9528={
                        <div
                            id="461_40204"
                            className="Pixso-instance-461_40204 pixso-relative-no-shrink"
                        ></div>
                    }
                    slot_3007_9527={
                        <div
                            id="461_40201"
                            className="Pixso-instance-461_40201 pixso-relative-no-shrink"
                        ></div>
                    }
                    slot_5222_17195={
                        <div
                            id="461_40184"
                            className="Pixso-vector-461_40184"
                        ></div>
                    }
                    slot_3007_9529={
                        <Darkmodefalseischargingtruechargecount8
                            id="461_40207"
                            className="Pixso-instance-461_40207 pixso-relative-no-shrink"
                            slot_421_9829={
                                <div
                                    id="461_40208"
                                    className="Pixso-instance-461_40208 pixso-relative-no-shrink"
                                ></div>
                            }
                            slot_421_9830={
                                <p
                                    id="461_40211"
                                    className="Pixso-paragraph-461_40211 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                >
                                    {"98%"}
                                </p>
                            }
                        ></Darkmodefalseischargingtruechargecount8>
                    }
                    slot_3007_9524={
                        <p
                            id="461_40194"
                            className="Pixso-paragraph-461_40194 text-medium14-429_12783 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"13:01"}
                        </p>
                    }
                ></StatusBarlocal>
                <Backbackdarkmodefalse
                    id="5573_20804"
                    className="Pixso-instance-5573_20804"
                    onDrag5573_20804421_111563212_15399={withStopPropagation(
                        drag_5573_20804_421_11156_3212_15399
                    )}
                    slot_421_11171={
                        <div
                            id="461_30947"
                            className="Pixso-vector-461_30947"
                        ></div>
                    }
                ></Backbackdarkmodefalse>
            </div>
        </div>
    );
};
export default Frame557320756;
