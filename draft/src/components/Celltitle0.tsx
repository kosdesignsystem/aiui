import Avatar from "@/components/Avatar";
import Icongroup from "@/components/Icongroup";
import { useState } from "react";
import Label0 from "@/components/Label0";
import Iconbuttongroup from "@/components/Iconbuttongroup";
import ButtonIcon1 from "@/components/Buttonicon1";
import Switch from "@/components/Switch";
import "@/styles/Celltitle0.css";
interface Celltitle0Props {
    text_5143_0?: string;
    visible_2483032695_287275730?: boolean;
    visible_2850472941_3924155206?: boolean;
    visible_3348250743_4245032708?: boolean;
    visible_3550061270_3646243804?: boolean;
    visible_3942958253_4226924562?: boolean;
    dark_mode?: string;
    left?: string;
    right?: string;
    padding?: string;
    content?: string;
    id?: string;
    className?: string;
    __pixsoClassOverrides?: Record<string, string[]>;
    slot_1981_158924?: React.ReactNode;
    slot_1981_158925?: React.ReactNode;
    slot_1981_158927?: React.ReactNode;
    slot_1981_158928?: React.ReactNode;
    slot_1981_158930?: React.ReactNode;
    slot_1981_158931?: React.ReactNode;
    slot_1981_158933?: React.ReactNode;
    slot_1981_158934?: React.ReactNode;
    slot_1981_158936?: React.ReactNode;
    slot_1981_158937?: React.ReactNode;
    slot_1981_158938?: React.ReactNode;
    slot_1981_158940?: React.ReactNode;
    slot_1981_158941?: React.ReactNode;
    slot_1981_158942?: React.ReactNode;
    slot_1981_158944?: React.ReactNode;
    slot_1981_158945?: React.ReactNode;
    slot_1981_158946?: React.ReactNode;
    slot_1981_158949?: React.ReactNode;
    slot_1981_158950?: React.ReactNode;
    slot_1981_158951?: React.ReactNode;
    slot_1981_158953?: React.ReactNode;
    slot_1981_158954?: React.ReactNode;
    slot_1981_158955?: React.ReactNode;
    slot_1981_158957?: React.ReactNode;
    slot_1981_158958?: React.ReactNode;
    slot_1981_158959?: React.ReactNode;
    slot_1981_158961?: React.ReactNode;
    slot_1981_158962?: React.ReactNode;
    slot_1981_158963?: React.ReactNode;
    slot_1981_158965?: React.ReactNode;
    slot_1981_158966?: React.ReactNode;
    slot_1981_158967?: React.ReactNode;
    slot_1981_158969?: React.ReactNode;
    slot_1981_158970?: React.ReactNode;
    slot_1981_158971?: React.ReactNode;
    slot_1981_158973?: React.ReactNode;
    slot_1981_158974?: React.ReactNode;
    slot_1981_158975?: React.ReactNode;
    slot_1981_158977?: React.ReactNode;
    slot_1981_158978?: React.ReactNode;
    slot_1981_158979?: React.ReactNode;
    slot_1981_158981?: React.ReactNode;
    slot_1981_158982?: React.ReactNode;
    slot_1981_158983?: React.ReactNode;
    slot_1981_158985?: React.ReactNode;
    slot_1981_158986?: React.ReactNode;
    slot_1981_158987?: React.ReactNode;
    slot_1981_158990?: React.ReactNode;
    slot_1981_158991?: React.ReactNode;
    slot_1981_158992?: React.ReactNode;
    slot_1981_158994?: React.ReactNode;
    slot_1981_158995?: React.ReactNode;
    slot_1981_158996?: React.ReactNode;
    slot_1981_158998?: React.ReactNode;
    slot_1981_158999?: React.ReactNode;
    slot_1981_159000?: React.ReactNode;
    slot_1981_159002?: React.ReactNode;
    slot_1981_159003?: React.ReactNode;
    slot_1981_159004?: React.ReactNode;
    slot_1981_159006?: React.ReactNode;
    slot_1981_159007?: React.ReactNode;
    slot_1981_159008?: React.ReactNode;
    slot_1981_159010?: React.ReactNode;
    slot_1981_159011?: React.ReactNode;
    slot_1981_159012?: React.ReactNode;
    slot_1981_159014?: React.ReactNode;
    slot_1981_159015?: React.ReactNode;
    slot_1981_159016?: React.ReactNode;
    slot_1981_159018?: React.ReactNode;
    slot_1981_159019?: React.ReactNode;
    slot_1981_159020?: React.ReactNode;
    slot_1981_159022?: React.ReactNode;
    slot_1981_159023?: React.ReactNode;
    slot_1981_159024?: React.ReactNode;
    slot_1981_159026?: React.ReactNode;
    slot_1981_159027?: React.ReactNode;
    slot_1981_159028?: React.ReactNode;
    slot_1981_159030?: React.ReactNode;
    slot_1981_159031?: React.ReactNode;
    slot_1981_159032?: React.ReactNode;
    slot_1981_159034?: React.ReactNode;
    slot_1981_159035?: React.ReactNode;
    slot_1981_159036?: React.ReactNode;
    slot_1981_159038?: React.ReactNode;
    slot_1981_159039?: React.ReactNode;
    slot_1981_159040?: React.ReactNode;
    slot_1981_159042?: React.ReactNode;
    slot_1981_159043?: React.ReactNode;
    slot_1981_159044?: React.ReactNode;
    slot_1981_159046?: React.ReactNode;
    slot_1981_159047?: React.ReactNode;
    slot_1981_159048?: React.ReactNode;
    slot_1981_159050?: React.ReactNode;
    slot_1981_159052?: React.ReactNode;
    slot_1981_159054?: React.ReactNode;
    slot_1981_159055?: React.ReactNode;
    slot_1981_159057?: React.ReactNode;
    slot_1981_159058?: React.ReactNode;
    slot_1981_159060?: React.ReactNode;
    slot_1981_159061?: React.ReactNode;
    slot_1981_159064?: React.ReactNode;
    slot_1981_159065?: React.ReactNode;
    slot_1981_159067?: React.ReactNode;
    slot_1981_159068?: React.ReactNode;
    slot_1981_159070?: React.ReactNode;
    slot_1981_159071?: React.ReactNode;
    slot_1981_159073?: React.ReactNode;
    slot_1981_159074?: React.ReactNode;
    slot_1981_159076?: React.ReactNode;
    slot_1981_159077?: React.ReactNode;
    slot_1981_159079?: React.ReactNode;
    slot_1981_159080?: React.ReactNode;
    slot_1981_159082?: React.ReactNode;
    slot_1981_159083?: React.ReactNode;
    slot_1981_159085?: React.ReactNode;
    slot_1981_159086?: React.ReactNode;
    slot_1981_159088?: React.ReactNode;
    slot_1981_159089?: React.ReactNode;
    slot_1981_159091?: React.ReactNode;
    slot_1981_159092?: React.ReactNode;
    slot_1981_159094?: React.ReactNode;
    slot_1981_159095?: React.ReactNode;
}
const Celltitle0 = (props: Celltitle0Props) => {
    const {
        text_5143_0 = "Title",
        visible_2483032695_287275730 = true,
        visible_2850472941_3924155206 = true,
        visible_3348250743_4245032708 = true,
        visible_3550061270_3646243804 = true,
        visible_3942958253_4226924562 = true,
        dark_mode,
        left,
        right,
        padding,
        content,
        id,
        className = "",
        __pixsoClassOverrides,
        slot_1981_158924,
        slot_1981_158925,
        slot_1981_158927,
        slot_1981_158928,
        slot_1981_158930,
        slot_1981_158931,
        slot_1981_158933,
        slot_1981_158934,
        slot_1981_158936,
        slot_1981_158937,
        slot_1981_158938,
        slot_1981_158940,
        slot_1981_158941,
        slot_1981_158942,
        slot_1981_158944,
        slot_1981_158945,
        slot_1981_158946,
        slot_1981_158949,
        slot_1981_158950,
        slot_1981_158951,
        slot_1981_158953,
        slot_1981_158954,
        slot_1981_158955,
        slot_1981_158957,
        slot_1981_158958,
        slot_1981_158959,
        slot_1981_158961,
        slot_1981_158962,
        slot_1981_158963,
        slot_1981_158965,
        slot_1981_158966,
        slot_1981_158967,
        slot_1981_158969,
        slot_1981_158970,
        slot_1981_158971,
        slot_1981_158973,
        slot_1981_158974,
        slot_1981_158975,
        slot_1981_158977,
        slot_1981_158978,
        slot_1981_158979,
        slot_1981_158981,
        slot_1981_158982,
        slot_1981_158983,
        slot_1981_158985,
        slot_1981_158986,
        slot_1981_158987,
        slot_1981_158990,
        slot_1981_158991,
        slot_1981_158992,
        slot_1981_158994,
        slot_1981_158995,
        slot_1981_158996,
        slot_1981_158998,
        slot_1981_158999,
        slot_1981_159000,
        slot_1981_159002,
        slot_1981_159003,
        slot_1981_159004,
        slot_1981_159006,
        slot_1981_159007,
        slot_1981_159008,
        slot_1981_159010,
        slot_1981_159011,
        slot_1981_159012,
        slot_1981_159014,
        slot_1981_159015,
        slot_1981_159016,
        slot_1981_159018,
        slot_1981_159019,
        slot_1981_159020,
        slot_1981_159022,
        slot_1981_159023,
        slot_1981_159024,
        slot_1981_159026,
        slot_1981_159027,
        slot_1981_159028,
        slot_1981_159030,
        slot_1981_159031,
        slot_1981_159032,
        slot_1981_159034,
        slot_1981_159035,
        slot_1981_159036,
        slot_1981_159038,
        slot_1981_159039,
        slot_1981_159040,
        slot_1981_159042,
        slot_1981_159043,
        slot_1981_159044,
        slot_1981_159046,
        slot_1981_159047,
        slot_1981_159048,
        slot_1981_159050,
        slot_1981_159052,
        slot_1981_159054,
        slot_1981_159055,
        slot_1981_159057,
        slot_1981_159058,
        slot_1981_159060,
        slot_1981_159061,
        slot_1981_159064,
        slot_1981_159065,
        slot_1981_159067,
        slot_1981_159068,
        slot_1981_159070,
        slot_1981_159071,
        slot_1981_159073,
        slot_1981_159074,
        slot_1981_159076,
        slot_1981_159077,
        slot_1981_159079,
        slot_1981_159080,
        slot_1981_159082,
        slot_1981_159083,
        slot_1981_159085,
        slot_1981_159086,
        slot_1981_159088,
        slot_1981_159089,
        slot_1981_159091,
        slot_1981_159092,
        slot_1981_159094,
        slot_1981_159095
    } = props;

    const [state_1981_158946, setState_1981_158946] = useState("selected");
    const [disabled_1981_158946, setDisabled_1981_158946] = useState("no");
    const [transitionConfig1981_158946, setTransitionConfig1981_158946] =
        useState({});
    const [state_1981_158951, setState_1981_158951] = useState("selected");
    const [disabled_1981_158951, setDisabled_1981_158951] = useState("no");
    const [transitionConfig1981_158951, setTransitionConfig1981_158951] =
        useState({});
    const [state_1981_158955, setState_1981_158955] = useState("deselected");
    const [disabled_1981_158955, setDisabled_1981_158955] = useState("no");
    const [transitionConfig1981_158955, setTransitionConfig1981_158955] =
        useState({});
    const [state_1981_158963, setState_1981_158963] = useState("deselected");
    const [disabled_1981_158963, setDisabled_1981_158963] = useState("no");
    const [transitionConfig1981_158963, setTransitionConfig1981_158963] =
        useState({});
    const [type_1057_170204, setType_1057_170204] = useState("default");
    const [size_1057_170204, setSize_1057_170204] = useState("medium");
    const [state_1057_170204, setState_1057_170204] = useState("default");
    const [state_1981_158987, setState_1981_158987] = useState("selected");
    const [disabled_1981_158987, setDisabled_1981_158987] = useState("no");
    const [transitionConfig1981_158987, setTransitionConfig1981_158987] =
        useState({});
    const [state_1981_158992, setState_1981_158992] = useState("selected");
    const [disabled_1981_158992, setDisabled_1981_158992] = useState("no");
    const [transitionConfig1981_158992, setTransitionConfig1981_158992] =
        useState({});
    const [state_1981_158996, setState_1981_158996] = useState("deselected");
    const [disabled_1981_158996, setDisabled_1981_158996] = useState("no");
    const [transitionConfig1981_158996, setTransitionConfig1981_158996] =
        useState({});
    const [state_1981_159004, setState_1981_159004] = useState("deselected");
    const [disabled_1981_159004, setDisabled_1981_159004] = useState("no");
    const [transitionConfig1981_159004, setTransitionConfig1981_159004] =
        useState({});
    const [type_1981_159020, setType_1981_159020] = useState("default");
    const [transitionConfig1981_159020, setTransitionConfig1981_159020] =
        useState({});
    const [type_1981_159024, setType_1981_159024] = useState("default");
    const [transitionConfig1981_159024, setTransitionConfig1981_159024] =
        useState({});
    const [type_1981_159028, setType_1981_159028] = useState("default");
    const [transitionConfig1981_159028, setTransitionConfig1981_159028] =
        useState({});
    const [type_1981_159032, setType_1981_159032] = useState("default");
    const [transitionConfig1981_159032, setTransitionConfig1981_159032] =
        useState({});
    const [state_1981_159061, setState_1981_159061] = useState("selected");
    const [disabled_1981_159061, setDisabled_1981_159061] = useState("no");
    const [transitionConfig1981_159061, setTransitionConfig1981_159061] =
        useState({});
    const [state_1981_159065, setState_1981_159065] = useState("selected");
    const [disabled_1981_159065, setDisabled_1981_159065] = useState("no");
    const [transitionConfig1981_159065, setTransitionConfig1981_159065] =
        useState({});
    const [state_1981_159068, setState_1981_159068] = useState("deselected");
    const [disabled_1981_159068, setDisabled_1981_159068] = useState("no");
    const [transitionConfig1981_159068, setTransitionConfig1981_159068] =
        useState({});
    const [state_1981_159074, setState_1981_159074] = useState("deselected");
    const [disabled_1981_159074, setDisabled_1981_159074] = useState("no");
    const [transitionConfig1981_159074, setTransitionConfig1981_159074] =
        useState({});
    const [type_1981_159086, setType_1981_159086] = useState("default");
    const [transitionConfig1981_159086, setTransitionConfig1981_159086] =
        useState({});
    const [type_1981_159089, setType_1981_159089] = useState("default");
    const [transitionConfig1981_159089, setTransitionConfig1981_159089] =
        useState({});
    const [transitionConfig1057_170204, setTransitionConfig1057_170204] =
        useState({});
    const transitionConfig: any = {
        "1981:159089_1057:169897_c": {
            transition: { duration: 0, ease: [0.215, 0.61, 0.355, 1] }
        }
    };

    const click_1981_158946 = () => {
        setState_1981_158946("deselected");
        setDisabled_1981_158946("no");
    };

    const click_1981_158951 = () => {
        setState_1981_158951("deselected");
        setDisabled_1981_158951("no");
    };

    const click_1981_158955 = () => {
        setState_1981_158955("selected");
        setDisabled_1981_158955("no");
    };

    const click_1981_158963 = () => {
        setState_1981_158963("selected");
        setDisabled_1981_158963("no");
    };

    const click_1981_158987 = () => {
        setState_1981_158987("deselected");
        setDisabled_1981_158987("no");
    };

    const click_1981_158992 = () => {
        setState_1981_158992("deselected");
        setDisabled_1981_158992("no");
    };

    const click_1981_158996 = () => {
        setState_1981_158996("selected");
        setDisabled_1981_158996("no");
    };

    const click_1981_159004 = () => {
        setState_1981_159004("selected");
        setDisabled_1981_159004("no");
    };

    const click_1981_159020 = () => {
        setType_1981_159020("loading");
    };

    const click_1981_159024 = () => {
        setType_1981_159024("loading");
    };

    const click_1981_159028 = () => {
        setType_1981_159028("loading");
    };

    const click_1981_159032 = () => {
        setType_1981_159032("loading");
    };

    const click_1981_159061 = () => {
        setState_1981_159061("deselected");
        setDisabled_1981_159061("no");
    };

    const click_1981_159065 = () => {
        setState_1981_159065("deselected");
        setDisabled_1981_159065("no");
    };

    const click_1981_159068 = () => {
        setState_1981_159068("selected");
        setDisabled_1981_159068("no");
    };

    const click_1981_159074 = () => {
        setState_1981_159074("selected");
        setDisabled_1981_159074("no");
    };

    const click_1981_159086 = () => {
        setType_1981_159086("loading");
    };

    const click_1981_159089 = () => {
        setType_1981_159089("loading");
    };

    const mouseover_1057_170204 = () => {
        setType_1057_170204("default");
        setSize_1057_170204("medium");
        setState_1057_170204("hover");
    };

    return (
        <div
            className={["component-1981_158922", className]
                .filter(Boolean)
                .join(" ")}
            id={id}
        >
            <div id="1981_158922" className="Pixso-symbol-1981_158922">
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "default" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1981_158923"
                            className="Pixso-symbol-1981_158923"
                        >
                            {slot_1981_158924 ?? (
                                <Avatar
                                    id="1981_158924"
                                    className="Pixso-instance-1981_158924"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar>
                            )}
                            {slot_1981_158925 ?? (
                                <p
                                    id="1981_158925"
                                    className="Pixso-paragraph-1981_158925 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "default" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1981_158926"
                            className="Pixso-symbol-1981_158926"
                        >
                            {slot_1981_158927 ?? (
                                <Avatar
                                    id="1981_158927"
                                    className="Pixso-instance-1981_158927"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar>
                            )}
                            {slot_1981_158928 ?? (
                                <p
                                    id="1981_158928"
                                    className="Pixso-paragraph-1981_158928 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "default" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1981_158929"
                            className="Pixso-symbol-1981_158929"
                        >
                            {slot_1981_158930 ?? (
                                <div
                                    id="1981_158930"
                                    className="Pixso-instance-1981_158930"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1981_158931 ?? (
                                <p
                                    id="1981_158931"
                                    className="Pixso-paragraph-1981_158931 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "default" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1981_158932"
                            className="Pixso-symbol-1981_158932"
                        >
                            {slot_1981_158933 ?? (
                                <div
                                    id="1981_158933"
                                    className="Pixso-instance-1981_158933"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1981_158934 ?? (
                                <p
                                    id="1981_158934"
                                    className="Pixso-paragraph-1981_158934 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "icons" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1981_158935"
                            className="Pixso-symbol-1981_158935"
                        >
                            {slot_1981_158936 ?? (
                                <Avatar
                                    id="1981_158936"
                                    className="Pixso-instance-1981_158936"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar>
                            )}
                            {slot_1981_158937 ?? (
                                <p
                                    id="1981_158937"
                                    className="Pixso-paragraph-1981_158937 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_158938 ?? (
                                <Icongroup
                                    id="1981_158938"
                                    className="Pixso-instance-1981_158938"
                                    count="1"
                                    dark_mode="false"
                                    gap="small"
                                    slot_1057_170147={
                                        <div
                                            id="1057_170147"
                                            className="Pixso-instance-1057_170147"
                                        ></div>
                                    }
                                ></Icongroup>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "icons" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1981_158939"
                            className="Pixso-symbol-1981_158939"
                        >
                            {slot_1981_158940 ?? (
                                <Avatar
                                    id="1981_158940"
                                    className="Pixso-instance-1981_158940"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar>
                            )}
                            {slot_1981_158941 ?? (
                                <p
                                    id="1981_158941"
                                    className="Pixso-paragraph-1981_158941 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_158942 ?? (
                                <Icongroup
                                    id="1981_158942"
                                    className="Pixso-instance-1981_158942"
                                    count="1"
                                    dark_mode="false"
                                    gap="small"
                                    slot_1057_170147={
                                        <div
                                            id="1057_170147"
                                            className="Pixso-instance-1057_170147"
                                        ></div>
                                    }
                                ></Icongroup>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "selected" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1981_158943"
                            className="Pixso-symbol-1981_158943"
                        >
                            {slot_1981_158944 ?? (
                                <Avatar
                                    id="1981_158944"
                                    className="Pixso-instance-1981_158944"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar>
                            )}
                            {slot_1981_158945 ?? (
                                <p
                                    id="1981_158945"
                                    className="Pixso-paragraph-1981_158945 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_158946 ?? (
                                <div
                                    id="1981_158946"
                                    className="Pixso-instance-1981_158946"
                                    state={state_1981_158946}
                                    disabled={disabled_1981_158946}
                                    transitionConfig={
                                        transitionConfig1981_158946
                                    }
                                    click={click_1981_158946}
                                ></div>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "selected" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1981_158947"
                            className="Pixso-symbol-1981_158947"
                        >
                            <div
                                id="1981_158948"
                                className="Pixso-rectangle-1981_158948"
                            ></div>
                            {slot_1981_158949 ?? (
                                <Avatar
                                    id="1981_158949"
                                    className="Pixso-instance-1981_158949"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar>
                            )}
                            {slot_1981_158950 ?? (
                                <p
                                    id="1981_158950"
                                    className="Pixso-paragraph-1981_158950 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_158951 ?? (
                                <div
                                    id="1981_158951"
                                    className="Pixso-instance-1981_158951"
                                    state={state_1981_158951}
                                    disabled={disabled_1981_158951}
                                    transitionConfig={
                                        transitionConfig1981_158951
                                    }
                                    click={click_1981_158951}
                                ></div>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "deselected" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1981_158952"
                            className="Pixso-symbol-1981_158952"
                        >
                            {slot_1981_158953 ?? (
                                <Avatar
                                    id="1981_158953"
                                    className="Pixso-instance-1981_158953"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar>
                            )}
                            {slot_1981_158954 ?? (
                                <p
                                    id="1981_158954"
                                    className="Pixso-paragraph-1981_158954 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_158955 ?? (
                                <div
                                    id="1981_158955"
                                    className="Pixso-instance-1981_158955"
                                    state={state_1981_158955}
                                    disabled={disabled_1981_158955}
                                    transitionConfig={
                                        transitionConfig1981_158955
                                    }
                                    click={click_1981_158955}
                                ></div>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "bubble" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1981_158956"
                            className="Pixso-symbol-1981_158956"
                        >
                            {slot_1981_158957 ?? (
                                <Avatar
                                    id="1981_158957"
                                    className="Pixso-instance-1981_158957"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar>
                            )}
                            {slot_1981_158958 ?? (
                                <p
                                    id="1981_158958"
                                    className="Pixso-paragraph-1981_158958 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_158959 ?? (
                                <Label0
                                    id="1981_158959"
                                    className="Pixso-instance-1981_158959"
                                    type="accent"
                                    size="big"
                                ></Label0>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "deselected" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1981_158960"
                            className="Pixso-symbol-1981_158960"
                        >
                            {slot_1981_158961 ?? (
                                <Avatar
                                    id="1981_158961"
                                    className="Pixso-instance-1981_158961"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar>
                            )}
                            {slot_1981_158962 ?? (
                                <p
                                    id="1981_158962"
                                    className="Pixso-paragraph-1981_158962 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_158963 ?? (
                                <div
                                    id="1981_158963"
                                    className="Pixso-instance-1981_158963"
                                    state={state_1981_158963}
                                    disabled={disabled_1981_158963}
                                    transitionConfig={
                                        transitionConfig1981_158963
                                    }
                                    click={click_1981_158963}
                                ></div>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "bubble" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1981_158964"
                            className="Pixso-symbol-1981_158964"
                        >
                            {slot_1981_158965 ?? (
                                <Avatar
                                    id="1981_158965"
                                    className="Pixso-instance-1981_158965"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar>
                            )}
                            {slot_1981_158966 ?? (
                                <p
                                    id="1981_158966"
                                    className="Pixso-paragraph-1981_158966 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_158967 ?? (
                                <Label0
                                    id="1981_158967"
                                    className="Pixso-instance-1981_158967"
                                    type="accent"
                                    size="big"
                                ></Label0>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "buttons" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1981_158968"
                            className="Pixso-symbol-1981_158968"
                        >
                            {slot_1981_158969 ?? (
                                <Avatar
                                    id="1981_158969"
                                    className="Pixso-instance-1981_158969"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar>
                            )}
                            {slot_1981_158970 ?? (
                                <p
                                    id="1981_158970"
                                    className="Pixso-paragraph-1981_158970 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_158971 ?? (
                                <Iconbuttongroup
                                    id="1981_158971"
                                    className="Pixso-instance-1981_158971"
                                    count="1"
                                    dark_mode="false"
                                    theme="blue"
                                ></Iconbuttongroup>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "buttons" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1981_158972"
                            className="Pixso-symbol-1981_158972"
                        >
                            {slot_1981_158973 ?? (
                                <Avatar
                                    id="1981_158973"
                                    className="Pixso-instance-1981_158973"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar>
                            )}
                            {slot_1981_158974 ?? (
                                <p
                                    id="1981_158974"
                                    className="Pixso-paragraph-1981_158974 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_158975 ?? (
                                <Iconbuttongroup
                                    id="1981_158975"
                                    className="Pixso-instance-1981_158975"
                                    count="1"
                                    dark_mode="false"
                                    theme="blue"
                                    slot_1057_170204={
                                        <ButtonIcon1
                                            id="1057_170204"
                                            className="Pixso-instance-1057_170204"
                                            type={type_1057_170204}
                                            size={size_1057_170204}
                                            state={state_1057_170204}
                                            transitionConfig={
                                                transitionConfig1057_170204
                                            }
                                            mouseover={mouseover_1057_170204}
                                            slot_978_1554={
                                                <div
                                                    id="978_1554"
                                                    className="Pixso-instance-978_1554"
                                                ></div>
                                            }
                                        ></ButtonIcon1>
                                    }
                                ></Iconbuttongroup>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "icons" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1981_158976"
                            className="Pixso-symbol-1981_158976"
                        >
                            {slot_1981_158977 ?? (
                                <div
                                    id="1981_158977"
                                    className="Pixso-instance-1981_158977"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1981_158978 ?? (
                                <p
                                    id="1981_158978"
                                    className="Pixso-paragraph-1981_158978 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_158979 ?? (
                                <Icongroup
                                    id="1981_158979"
                                    className="Pixso-instance-1981_158979"
                                    count="1"
                                    dark_mode="false"
                                    gap="small"
                                    slot_1057_170147={
                                        <div
                                            id="1057_170147"
                                            className="Pixso-instance-1057_170147"
                                        ></div>
                                    }
                                ></Icongroup>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "icons" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1981_158980"
                            className="Pixso-symbol-1981_158980"
                        >
                            {slot_1981_158981 ?? (
                                <div
                                    id="1981_158981"
                                    className="Pixso-instance-1981_158981"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1981_158982 ?? (
                                <p
                                    id="1981_158982"
                                    className="Pixso-paragraph-1981_158982 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_158983 ?? (
                                <Icongroup
                                    id="1981_158983"
                                    className="Pixso-instance-1981_158983"
                                    count="1"
                                    dark_mode="false"
                                    gap="small"
                                    slot_1057_170147={
                                        <div
                                            id="1057_170147"
                                            className="Pixso-instance-1057_170147"
                                        ></div>
                                    }
                                ></Icongroup>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "selected" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1981_158984"
                            className="Pixso-symbol-1981_158984"
                        >
                            {slot_1981_158985 ?? (
                                <div
                                    id="1981_158985"
                                    className="Pixso-instance-1981_158985"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1981_158986 ?? (
                                <p
                                    id="1981_158986"
                                    className="Pixso-paragraph-1981_158986 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_158987 ?? (
                                <div
                                    id="1981_158987"
                                    className="Pixso-instance-1981_158987"
                                    state={state_1981_158987}
                                    disabled={disabled_1981_158987}
                                    transitionConfig={
                                        transitionConfig1981_158987
                                    }
                                    click={click_1981_158987}
                                ></div>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "selected" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1981_158988"
                            className="Pixso-symbol-1981_158988"
                        >
                            <div
                                id="1981_158989"
                                className="Pixso-rectangle-1981_158989"
                            ></div>
                            {slot_1981_158990 ?? (
                                <div
                                    id="1981_158990"
                                    className="Pixso-instance-1981_158990"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1981_158991 ?? (
                                <p
                                    id="1981_158991"
                                    className="Pixso-paragraph-1981_158991 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_158992 ?? (
                                <div
                                    id="1981_158992"
                                    className="Pixso-instance-1981_158992"
                                    state={state_1981_158992}
                                    disabled={disabled_1981_158992}
                                    transitionConfig={
                                        transitionConfig1981_158992
                                    }
                                    click={click_1981_158992}
                                ></div>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "deselected" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1981_158993"
                            className="Pixso-symbol-1981_158993"
                        >
                            {slot_1981_158994 ?? (
                                <div
                                    id="1981_158994"
                                    className="Pixso-instance-1981_158994"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1981_158995 ?? (
                                <p
                                    id="1981_158995"
                                    className="Pixso-paragraph-1981_158995 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_158996 ?? (
                                <div
                                    id="1981_158996"
                                    className="Pixso-instance-1981_158996"
                                    state={state_1981_158996}
                                    disabled={disabled_1981_158996}
                                    transitionConfig={
                                        transitionConfig1981_158996
                                    }
                                    click={click_1981_158996}
                                ></div>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "bubble" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1981_158997"
                            className="Pixso-symbol-1981_158997"
                        >
                            {slot_1981_158998 ?? (
                                <div
                                    id="1981_158998"
                                    className="Pixso-instance-1981_158998"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1981_158999 ?? (
                                <p
                                    id="1981_158999"
                                    className="Pixso-paragraph-1981_158999 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_159000 ?? (
                                <Label0
                                    id="1981_159000"
                                    className="Pixso-instance-1981_159000"
                                    type="accent"
                                    size="big"
                                ></Label0>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "deselected" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1981_159001"
                            className="Pixso-symbol-1981_159001"
                        >
                            {slot_1981_159002 ?? (
                                <div
                                    id="1981_159002"
                                    className="Pixso-instance-1981_159002"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1981_159003 ?? (
                                <p
                                    id="1981_159003"
                                    className="Pixso-paragraph-1981_159003 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_159004 ?? (
                                <div
                                    id="1981_159004"
                                    className="Pixso-instance-1981_159004"
                                    state={state_1981_159004}
                                    disabled={disabled_1981_159004}
                                    transitionConfig={
                                        transitionConfig1981_159004
                                    }
                                    click={click_1981_159004}
                                ></div>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "bubble" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1981_159005"
                            className="Pixso-symbol-1981_159005"
                        >
                            {slot_1981_159006 ?? (
                                <div
                                    id="1981_159006"
                                    className="Pixso-instance-1981_159006"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1981_159007 ?? (
                                <p
                                    id="1981_159007"
                                    className="Pixso-paragraph-1981_159007 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_159008 ?? (
                                <Label0
                                    id="1981_159008"
                                    className="Pixso-instance-1981_159008"
                                    type="accent"
                                    size="big"
                                ></Label0>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "buttons" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1981_159009"
                            className="Pixso-symbol-1981_159009"
                        >
                            {slot_1981_159010 ?? (
                                <div
                                    id="1981_159010"
                                    className="Pixso-instance-1981_159010"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1981_159011 ?? (
                                <p
                                    id="1981_159011"
                                    className="Pixso-paragraph-1981_159011 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_159012 ?? (
                                <Iconbuttongroup
                                    id="1981_159012"
                                    className="Pixso-instance-1981_159012"
                                    count="1"
                                    dark_mode="false"
                                    theme="blue"
                                ></Iconbuttongroup>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "buttons" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1981_159013"
                            className="Pixso-symbol-1981_159013"
                        >
                            {slot_1981_159014 ?? (
                                <div
                                    id="1981_159014"
                                    className="Pixso-instance-1981_159014"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1981_159015 ?? (
                                <p
                                    id="1981_159015"
                                    className="Pixso-paragraph-1981_159015 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_159016 ?? (
                                <Iconbuttongroup
                                    id="1981_159016"
                                    className="Pixso-instance-1981_159016"
                                    count="1"
                                    dark_mode="false"
                                    theme="blue"
                                    slot_1057_170204={
                                        <ButtonIcon1
                                            id="1057_170204"
                                            className="Pixso-instance-1057_170204"
                                            type={type_1057_170204}
                                            size={size_1057_170204}
                                            state={state_1057_170204}
                                            transitionConfig={
                                                transitionConfig1057_170204
                                            }
                                            mouseover={mouseover_1057_170204}
                                            slot_978_1554={
                                                <div
                                                    id="978_1554"
                                                    className="Pixso-instance-978_1554"
                                                ></div>
                                            }
                                        ></ButtonIcon1>
                                    }
                                ></Iconbuttongroup>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "switch" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1981_159017"
                            className="Pixso-symbol-1981_159017"
                        >
                            {slot_1981_159018 ?? (
                                <Avatar
                                    id="1981_159018"
                                    className="Pixso-instance-1981_159018"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar>
                            )}
                            {slot_1981_159019 ?? (
                                <p
                                    id="1981_159019"
                                    className="Pixso-paragraph-1981_159019 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_159020 ?? (
                                <Switch
                                    id="1981_159020"
                                    className="Pixso-instance-1981_159020"
                                    type={type_1981_159020}
                                    transitionConfig={
                                        transitionConfig1981_159020
                                    }
                                    click={click_1981_159020}
                                ></Switch>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "switch" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1981_159021"
                            className="Pixso-symbol-1981_159021"
                        >
                            {slot_1981_159022 ?? (
                                <Avatar
                                    id="1981_159022"
                                    className="Pixso-instance-1981_159022"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar>
                            )}
                            {slot_1981_159023 ?? (
                                <p
                                    id="1981_159023"
                                    className="Pixso-paragraph-1981_159023 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_159024 ?? (
                                <Switch
                                    id="1981_159024"
                                    className="Pixso-instance-1981_159024"
                                    type={type_1981_159024}
                                    transitionConfig={
                                        transitionConfig1981_159024
                                    }
                                    click={click_1981_159024}
                                ></Switch>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "switch" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1981_159025"
                            className="Pixso-symbol-1981_159025"
                        >
                            {slot_1981_159026 ?? (
                                <div
                                    id="1981_159026"
                                    className="Pixso-instance-1981_159026"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1981_159027 ?? (
                                <p
                                    id="1981_159027"
                                    className="Pixso-paragraph-1981_159027 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_159028 ?? (
                                <Switch
                                    id="1981_159028"
                                    className="Pixso-instance-1981_159028"
                                    type={type_1981_159028}
                                    transitionConfig={
                                        transitionConfig1981_159028
                                    }
                                    click={click_1981_159028}
                                ></Switch>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "switch" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1981_159029"
                            className="Pixso-symbol-1981_159029"
                        >
                            {slot_1981_159030 ?? (
                                <div
                                    id="1981_159030"
                                    className="Pixso-instance-1981_159030"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1981_159031 ?? (
                                <p
                                    id="1981_159031"
                                    className="Pixso-paragraph-1981_159031 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_159032 ?? (
                                <Switch
                                    id="1981_159032"
                                    className="Pixso-instance-1981_159032"
                                    type={type_1981_159032}
                                    transitionConfig={
                                        transitionConfig1981_159032
                                    }
                                    click={click_1981_159032}
                                ></Switch>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "text" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1981_159033"
                            className="Pixso-symbol-1981_159033"
                        >
                            {slot_1981_159034 ?? (
                                <Avatar
                                    id="1981_159034"
                                    className="Pixso-instance-1981_159034"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar>
                            )}
                            {slot_1981_159035 ?? (
                                <p
                                    id="1981_159035"
                                    className="Pixso-paragraph-1981_159035 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_159036 ?? (
                                <p
                                    id="1981_159036"
                                    className="Pixso-paragraph-1981_159036 text-regular14-1981_159096"
                                >
                                    {"1 час 23 мин."}
                                </p>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "avatar" &&
                    right === "text" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1981_159037"
                            className="Pixso-symbol-1981_159037"
                        >
                            {slot_1981_159038 ?? (
                                <Avatar
                                    id="1981_159038"
                                    className="Pixso-instance-1981_159038"
                                    isHexahon="false"
                                    type="image"
                                    status="no"
                                    size="40"
                                ></Avatar>
                            )}
                            {slot_1981_159039 ?? (
                                <p
                                    id="1981_159039"
                                    className="Pixso-paragraph-1981_159039 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_159040 ?? (
                                <p
                                    id="1981_159040"
                                    className="Pixso-paragraph-1981_159040 text-regular14-1981_159096"
                                >
                                    {"1 час 23 мин."}
                                </p>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "text" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1981_159041"
                            className="Pixso-symbol-1981_159041"
                        >
                            {slot_1981_159042 ?? (
                                <div
                                    id="1981_159042"
                                    className="Pixso-instance-1981_159042"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1981_159043 ?? (
                                <p
                                    id="1981_159043"
                                    className="Pixso-paragraph-1981_159043 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_159044 ?? (
                                <p
                                    id="1981_159044"
                                    className="Pixso-paragraph-1981_159044 text-regular14-1981_159096"
                                >
                                    {"1 час 23 мин."}
                                </p>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "icon" &&
                    right === "text" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1981_159045"
                            className="Pixso-symbol-1981_159045"
                        >
                            {slot_1981_159046 ?? (
                                <div
                                    id="1981_159046"
                                    className="Pixso-instance-1981_159046"
                                    is_outline="false"
                                ></div>
                            )}
                            {slot_1981_159047 ?? (
                                <p
                                    id="1981_159047"
                                    className="Pixso-paragraph-1981_159047 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_159048 ?? (
                                <p
                                    id="1981_159048"
                                    className="Pixso-paragraph-1981_159048 text-regular14-1981_159096"
                                >
                                    {"1 час 23 мин."}
                                </p>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "default" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1981_159049"
                            className="Pixso-symbol-1981_159049"
                        >
                            {slot_1981_159050 ?? (
                                <p
                                    id="1981_159050"
                                    className="Pixso-paragraph-1981_159050 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "default" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1981_159051"
                            className="Pixso-symbol-1981_159051"
                        >
                            {slot_1981_159052 ?? (
                                <p
                                    id="1981_159052"
                                    className="Pixso-paragraph-1981_159052 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "icons" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1981_159053"
                            className="Pixso-symbol-1981_159053"
                        >
                            {slot_1981_159054 ?? (
                                <p
                                    id="1981_159054"
                                    className="Pixso-paragraph-1981_159054 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_159055 ?? (
                                <Icongroup
                                    id="1981_159055"
                                    className="Pixso-instance-1981_159055"
                                    count="1"
                                    dark_mode="false"
                                    gap="small"
                                    slot_1057_170147={
                                        <div
                                            id="1057_170147"
                                            className="Pixso-instance-1057_170147"
                                        ></div>
                                    }
                                ></Icongroup>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "icons" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1981_159056"
                            className="Pixso-symbol-1981_159056"
                        >
                            {slot_1981_159057 ?? (
                                <p
                                    id="1981_159057"
                                    className={[
                                        "Pixso-paragraph-1981_159057 text-medium16-1981_159097",
                                        (
                                            __pixsoClassOverrides?.[
                                                "overrideClass_1981_159057"
                                            ] || []
                                        ).join(" ")
                                    ]
                                        .filter(Boolean)
                                        .join(" ")}
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_159058 ?? (
                                <Icongroup
                                    id="1981_159058"
                                    className="Pixso-instance-1981_159058"
                                    count="1"
                                    dark_mode="false"
                                    gap="small"
                                    slot_1057_170147={
                                        <div
                                            id="1057_170147"
                                            className="Pixso-instance-1057_170147"
                                        ></div>
                                    }
                                ></Icongroup>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "selected" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1981_159059"
                            className="Pixso-symbol-1981_159059"
                        >
                            {slot_1981_159060 ?? (
                                <p
                                    id="1981_159060"
                                    className="Pixso-paragraph-1981_159060 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_159061 ?? (
                                <div
                                    id="1981_159061"
                                    className="Pixso-instance-1981_159061"
                                    state={state_1981_159061}
                                    disabled={disabled_1981_159061}
                                    transitionConfig={
                                        transitionConfig1981_159061
                                    }
                                    click={click_1981_159061}
                                ></div>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "selected" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1981_159062"
                            className="Pixso-symbol-1981_159062"
                        >
                            <div
                                id="1981_159063"
                                className="Pixso-rectangle-1981_159063"
                            ></div>
                            {slot_1981_159064 ?? (
                                <p
                                    id="1981_159064"
                                    className="Pixso-paragraph-1981_159064 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_159065 ?? (
                                <div
                                    id="1981_159065"
                                    className="Pixso-instance-1981_159065"
                                    state={state_1981_159065}
                                    disabled={disabled_1981_159065}
                                    transitionConfig={
                                        transitionConfig1981_159065
                                    }
                                    click={click_1981_159065}
                                ></div>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "deselected" &&
                    padding === "yes" &&
                    content === "New value" && (
                        <div
                            id="1981_159066"
                            className="Pixso-symbol-1981_159066"
                        >
                            {slot_1981_159067 ?? (
                                <p
                                    id="1981_159067"
                                    className="Pixso-paragraph-1981_159067 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_159068 ?? (
                                <div
                                    id="1981_159068"
                                    className="Pixso-instance-1981_159068"
                                    state={state_1981_159068}
                                    disabled={disabled_1981_159068}
                                    transitionConfig={
                                        transitionConfig1981_159068
                                    }
                                    click={click_1981_159068}
                                ></div>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "bubble" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1981_159069"
                            className="Pixso-symbol-1981_159069"
                        >
                            {slot_1981_159070 ?? (
                                <p
                                    id="1981_159070"
                                    className="Pixso-paragraph-1981_159070 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_159071 ?? (
                                <Label0
                                    id="1981_159071"
                                    className="Pixso-instance-1981_159071"
                                    type="accent"
                                    size="big"
                                ></Label0>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "deselected" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1981_159072"
                            className="Pixso-symbol-1981_159072"
                        >
                            {slot_1981_159073 ?? (
                                <p
                                    id="1981_159073"
                                    className="Pixso-paragraph-1981_159073 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_159074 ?? (
                                <div
                                    id="1981_159074"
                                    className="Pixso-instance-1981_159074"
                                    state={state_1981_159074}
                                    disabled={disabled_1981_159074}
                                    transitionConfig={
                                        transitionConfig1981_159074
                                    }
                                    click={click_1981_159074}
                                ></div>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "bubble" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1981_159075"
                            className="Pixso-symbol-1981_159075"
                        >
                            {slot_1981_159076 ?? (
                                <p
                                    id="1981_159076"
                                    className="Pixso-paragraph-1981_159076 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_159077 ?? (
                                <Label0
                                    id="1981_159077"
                                    className="Pixso-instance-1981_159077"
                                    type="accent"
                                    size="big"
                                ></Label0>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "buttons" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1981_159078"
                            className="Pixso-symbol-1981_159078"
                        >
                            {slot_1981_159079 ?? (
                                <p
                                    id="1981_159079"
                                    className="Pixso-paragraph-1981_159079 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_159080 ?? (
                                <Iconbuttongroup
                                    id="1981_159080"
                                    className="Pixso-instance-1981_159080"
                                    count="1"
                                    dark_mode="false"
                                    theme="blue"
                                ></Iconbuttongroup>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "buttons" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1981_159081"
                            className="Pixso-symbol-1981_159081"
                        >
                            {slot_1981_159082 ?? (
                                <p
                                    id="1981_159082"
                                    className="Pixso-paragraph-1981_159082 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_159083 ?? (
                                <Iconbuttongroup
                                    id="1981_159083"
                                    className="Pixso-instance-1981_159083"
                                    count="1"
                                    dark_mode="false"
                                    theme="blue"
                                    slot_1057_170204={
                                        <ButtonIcon1
                                            id="1057_170204"
                                            className="Pixso-instance-1057_170204"
                                            type={type_1057_170204}
                                            size={size_1057_170204}
                                            state={state_1057_170204}
                                            transitionConfig={
                                                transitionConfig1057_170204
                                            }
                                            mouseover={mouseover_1057_170204}
                                            slot_978_1554={
                                                <div
                                                    id="978_1554"
                                                    className="Pixso-instance-978_1554"
                                                ></div>
                                            }
                                        ></ButtonIcon1>
                                    }
                                ></Iconbuttongroup>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "switch" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1981_159084"
                            className="Pixso-symbol-1981_159084"
                        >
                            {slot_1981_159085 ?? (
                                <p
                                    id="1981_159085"
                                    className="Pixso-paragraph-1981_159085 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_159086 ?? (
                                <Switch
                                    id="1981_159086"
                                    className="Pixso-instance-1981_159086"
                                    type={type_1981_159086}
                                    transitionConfig={
                                        transitionConfig1981_159086
                                    }
                                    click={click_1981_159086}
                                ></Switch>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "switch" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1981_159087"
                            className="Pixso-symbol-1981_159087"
                        >
                            {slot_1981_159088 ?? (
                                <p
                                    id="1981_159088"
                                    className="Pixso-paragraph-1981_159088 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_159089 ?? (
                                <Switch
                                    id="1981_159089"
                                    className="Pixso-instance-1981_159089"
                                    type={type_1981_159089}
                                    transitionConfig={
                                        transitionConfig1981_159089
                                    }
                                    click={click_1981_159089}
                                ></Switch>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "text" &&
                    padding === "yes" &&
                    content === "title" && (
                        <div
                            id="1981_159090"
                            className="Pixso-symbol-1981_159090"
                        >
                            {slot_1981_159091 ?? (
                                <p
                                    id="1981_159091"
                                    className="Pixso-paragraph-1981_159091 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_159092 ?? (
                                <p
                                    id="1981_159092"
                                    className="Pixso-paragraph-1981_159092 text-regular14-1981_159096"
                                >
                                    {"1 час 23 мин."}
                                </p>
                            )}
                        </div>
                    )}
                {dark_mode === "no" &&
                    left === "no" &&
                    right === "text" &&
                    padding === "no" &&
                    content === "title" && (
                        <div
                            id="1981_159093"
                            className="Pixso-symbol-1981_159093"
                        >
                            {slot_1981_159094 ?? (
                                <p
                                    id="1981_159094"
                                    className="Pixso-paragraph-1981_159094 text-medium16-1981_159097"
                                >
                                    {text_5143_0 ?? "Title"}
                                </p>
                            )}
                            {slot_1981_159095 ?? (
                                <p
                                    id="1981_159095"
                                    className="Pixso-paragraph-1981_159095 text-regular14-1981_159096"
                                >
                                    {"1 час 23 мин."}
                                </p>
                            )}
                        </div>
                    )}
            </div>
        </div>
    );
};
export default Celltitle0;
