import React from "react";
import classNames from "classnames";
import { CARD_NUMBER_FRAME } from "../config/config";

export const CardNumber: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={classNames(CARD_NUMBER_FRAME, className)} {...props} />;
