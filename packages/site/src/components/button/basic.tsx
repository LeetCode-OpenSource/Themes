import styled from '@emotion/styled'

export interface ButtonColorScheme {
  backgroundColor: string
  color: string
}

export interface ButtonSizeScheme {
  padding: number
}

export const BasicButton = styled.button<{ theme: ButtonColorScheme; size: ButtonSizeScheme }>(
  (props) => ({
    color: props.theme.color,
    backgroundColor: props.theme.backgroundColor,
    padding: props.size.padding,
  }),
)
