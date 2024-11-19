import React from "react";
import classNames from "classnames";
import { SCHEME_CHOICE_FRAME } from "../config/config";

export const SchemeChoice: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={classNames(SCHEME_CHOICE_FRAME, className)} {...props} />;
