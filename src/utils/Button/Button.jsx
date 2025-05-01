import classNames from "classnames";
import Link from "next/link";
import React from "react";

import "./Button.scss";

export const Button = ({
  text,
  href,
  classes,
  color = "transparent",
  iconImage = false,
  iconShow = true,
  ...rest
}) => {
  return (
    <Link
      className={classNames("button", {
        [`button--${color}`]: color,
        "button--not-icon": !iconShow,
        [classes]: classes,
      })}
      {...rest}
      href={href}
      passHref
    >
    {iconShow && (
      <div className="button__icon">
        {iconImage ? (
          <img src={iconImage} alt="icon" />
        ) : (
          <span>{text.split('')[0]}</span>
        )}
      </div>
    )}
      <div className="button__text">{text}</div>
    </Link>
  );
};
