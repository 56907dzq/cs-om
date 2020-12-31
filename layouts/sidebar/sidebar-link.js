import { chakra, useColorModeValue } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import React from "react"

const StyledLink = React.forwardRef(function StyledLink(
  props,
  ref,
){
  const { isActive, ...rest } = props
  return (
    <chakra.a
      aria-current={isActive ? "page" : undefined}
      width="100%"
      px="3"
      py="1"
      rounded="md"
      ref={ref}
      fontSize="sm"
      fontWeight="500"
      color={useColorModeValue("gray.700", "whiteAlpha.900")}
      transition="all 0.2s"
      _activeLink={{
        bg: useColorModeValue("teal.50", "rgba(48, 140, 122, 0.3)"),
        color: useColorModeValue("teal.700", "teal.200"),
        fontWeight: "600",
      }}
      {...rest}
    />
  )
})


const SidebarLink = (props) => {
  const { href, icon, children, ...rest } = props

  const { pathname } = useRouter()
  const isActive = pathname === href

  return (
    <chakra.div
      userSelect="none"
      display="flex"
      alignItems="center"
      lineHeight="1.5rem"
      {...rest}
    >
      <NextLink href={href} passHref>
        <StyledLink isActive={isActive}>{children}</StyledLink>
      </NextLink>
    </chakra.div>
  )
}

export default SidebarLink
