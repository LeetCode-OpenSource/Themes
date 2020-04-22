import * as React from 'react'
import { MarkOptional } from 'ts-essentials'

export function withDefaultProps<P1, P2 extends P1>(
  Component: React.ComponentType<P1>,
  defaultProps: P2,
): React.FunctionComponent<MarkOptional<P1, Extract<keyof P1, keyof P2>>> {
  return function WithDefaultProps(props) {
    return <Component {...defaultProps} {...props} />
  }
}
