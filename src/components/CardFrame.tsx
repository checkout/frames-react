import React from "react";
import classNames from "classnames";
import { CARD_FRAME } from "../config/config";

export const CardFrame: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={classNames(CARD_FRAME, className)} {...props} />;
