import React from "react";
import classNames from "classnames";
import { EXPIRY_DATE_FRAME } from "../config/config";

export const ExpiryDate: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={classNames(EXPIRY_DATE_FRAME, className)} {...props} />;
