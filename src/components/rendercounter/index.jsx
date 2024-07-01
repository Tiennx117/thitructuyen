import cx from "classnames";

import { useRenderCounter } from "shared/hooks/useRenderCounter";

import styles from "./RenderCounter.module.css";

export const RenderCounter = ({ label, className }) => {
  const [count] = useRenderCounter(label);

  return <div className={cx(styles.counter, className)}>{count}</div>;
};
