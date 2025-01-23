import React from "react";
import { css } from "../../styled-system/css";

export function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, ...rest } = props;
  return <button
    className={`${css({ bg: 'green.500', _hover: { bg: 'green.700' }, color: 'white', py: '2', px: '3', rounded: 'md', cursor: 'pointer' })} ${className}`}
    {...rest}
  >
    {children}
  </button>
}
