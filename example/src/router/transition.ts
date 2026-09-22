export interface TransitionProps {
  initial: Record<string, number | string>;
  animate: Record<string, number | string>;
  exit: Record<string, number | string>;
}

export interface TransitionPropMap {
  push: Record<string, string>;
  pop: Record<string, string>;
}

// 预设的动画类型
export const presetAnimateType: Record<string, TransitionProps> = {
  "fade": {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "slide-left": {
    initial: { transform: "translateX(100%)" },
    animate: { transform: "translateX(0%)" },
    exit: { transform: "translateX(-100%)" },
  },
  "slide-right": {
    initial: { transform: "translateX(-100%)" },
    animate: { transform: "translateX(0%)" },
    exit: { transform: "translateX(100%)" },
  },
  "slide-top": {
    initial: { transform: "translateY(100%)" },
    animate: { transform: "translateY(0%)" },
    exit: { transform: "translateY(-100%)" },
  },
  "slide-bottom": {
    initial: { transform: "translateY(-100%)" },
    animate: { transform: "translateY(0%)" },
    exit: { transform: "translateY(100%)" },
  },
}

export const transitionPropMap: TransitionPropMap = {"push":{"209:40674_0:0_c":"fade"},"pop":{"209:40674_0:0_c":"fade"}};

export interface TransitionItem {
  duration: number;
  timing: number[];
}

export interface TransitionResult {
  props: TransitionProps;
  transition?: TransitionItem;
}

export const transitionMap: Record<string, TransitionItem> = {"209:40674_0:0_c":{"duration":0.2,"timing":[0.55,0.055,0.675,0.19]}};

export const defaultTransitionProps: TransitionProps = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 1 },
};

export const getPageTransition = (
  from: string,
  to: string,
  eventType: string,
  type: "push" | "pop"
): TransitionResult => {
  const key = from + "_" + to + "_" + eventType;
  const transitionProps = presetAnimateType[transitionPropMap[type][key]] || defaultTransitionProps;
  const transition = transitionMap[key];

  return {
    props: transitionProps,
    transition,
  };
};
