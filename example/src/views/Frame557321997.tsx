import { useNavigate } from "react-router";
import { getPathByGuid } from "@/router/routes";
import { withStopPropagation } from "@/utils/utils";
import StatusBarlocal from "@/components/Statusbarlocal";
import Darkmodefalseischargingtruechargecount8 from "@/components/Darkmodefalseischargingtruechargecount8";
import Backbackdarkmodefalse from "@/components/Backbackdarkmodefalse";
import "@/styles/Frame557321997.css";
const Frame557321997 = () => {
    const navigate = useNavigate();

    const click_5573_22039 = () => {
        navigate(getPathByGuid("5573:20756"), {
            state: {
                from: "5573:22039",
                et: "c"
            }
        });
    };

    const drag_5573_22045_421_11156_3212_15400 = () => {
        navigate(-1);
    };

    return (
        <div className="scroll-container">
            <div
                id="5573_21997"
                className="Pixso-frame-5573_21997 pixso-relative-no-shrink"
            >
                <div
                    id="5573_21998"
                    className="Pixso-rectangle-5573_21998"
                ></div>
                <div
                    id="5573_22037"
                    className="Pixso-rectangle-5573_22037"
                ></div>
                <div
                    id="5573_22039"
                    className="Pixso-rectangle-5573_22039"
                    onClick={withStopPropagation(click_5573_22039)}
                ></div>
                <StatusBarlocal
                    id="5573_22044"
                    className="Pixso-instance-5573_22044"
                    slot_3007_9528={
                        <div
                            id="461_39914"
                            className="Pixso-instance-461_39914 pixso-relative-no-shrink"
                        ></div>
                    }
                    slot_3007_9527={
                        <div
                            id="461_39911"
                            className="Pixso-instance-461_39911 pixso-relative-no-shrink"
                        ></div>
                    }
                    slot_5222_17195={
                        <div
                            id="461_39894"
                            className="Pixso-vector-461_39894"
                        ></div>
                    }
                    slot_3007_9529={
                        <Darkmodefalseischargingtruechargecount8
                            id="461_39917"
                            className="Pixso-instance-461_39917 pixso-relative-no-shrink"
                            slot_421_9829={
                                <div
                                    id="461_39918"
                                    className="Pixso-instance-461_39918 pixso-relative-no-shrink"
                                ></div>
                            }
                            slot_421_9830={
                                <p
                                    id="461_39921"
                                    className="Pixso-paragraph-461_39921 text-medium14-1_10433 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                >
                                    {"98%"}
                                </p>
                            }
                        ></Darkmodefalseischargingtruechargecount8>
                    }
                    slot_3007_9524={
                        <p
                            id="461_39904"
                            className="Pixso-paragraph-461_39904 text-medium14-429_12783 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            {"13:01"}
                        </p>
                    }
                ></StatusBarlocal>
                <Backbackdarkmodefalse
                    id="5573_22045"
                    className="Pixso-instance-5573_22045"
                    onDrag5573_22045421_111563212_15400={withStopPropagation(
                        drag_5573_22045_421_11156_3212_15400
                    )}
                    slot_421_11171={
                        <div
                            id="461_31635"
                            className="Pixso-vector-461_31635"
                        ></div>
                    }
                ></Backbackdarkmodefalse>
            </div>
        </div>
    );
};
export default Frame557321997;
