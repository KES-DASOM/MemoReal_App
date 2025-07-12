import { Pressable, PressableProps, Text } from 'react-native'
import { styled } from 'nativewind'
import React from 'react'

const StyledButton = styled(Pressable)
const StyledText = styled(Text)

interface Props extends PressableProps {
  textClassName?: string
  className?: string
  children?: React.ReactNode
}

export default function CustomButton({ children ,className, textClassName, ...rest }: Props) {
  return (
    <StyledButton className={`${className}`} {...rest}>
      <StyledText className={`text-center ${textClassName}`}>{children}</StyledText>
    </StyledButton>
  )
}
