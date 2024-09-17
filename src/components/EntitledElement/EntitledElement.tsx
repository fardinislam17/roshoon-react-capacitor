import React from "react";

export type EntitleElementProps = {
  children: JSX.Element;
  fallback?: JSX.Element;
  role: string;
};

const EntitledElement = (props: EntitleElementProps) => {
  const { children, fallback, role } = props;
  if (role !== "dev") {
    return fallback ? fallback : <>........</>;
  }
  return children;
};

export default EntitledElement;
