import React from "react";
import classNames from "classnames";
import { CVV_FRAME } from "../config/config";

export const Cvv: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={classNames(CVV_FRAME, className)} {...props} />;
