import {
  Box,
  Center,
  Flex,
  List,
  Icon,
  chakra,
  ListItem,
  useColorModeValue,
} from "@chakra-ui/react"
import * as React from "react"
import { useRouter } from "next/router"
import SidebarLink from "./sidebar-link"
import SidebarRouter from 'configs/sidebar.json'
import { MdSettings } from "react-icons/md"
import NextLink from "next/link"

export function getRoutes(slug) {
  if (slug.startsWith('/config')) {
    return SidebarRouter
  }
  else
    return {'routes': []}
}



export function SidebarContent(props) {
  const { pathname } = props
  const { routes } = getRoutes(pathname)
  return (
    <>
      {routes.map((lvl1, idx) => {
        return (
          <React.Fragment key={idx}>
            {lvl1.heading && (
              <chakra.h4
                fontSize="sm"
                fontWeight="bold"
                my="1.25rem"
                textTransform="uppercase"
                letterSpacing="wider"
                color={useColorModeValue("gray.700", "inherit")}
              >
                {lvl1.title}
              </chakra.h4>
            )}
            {lvl1.routes.map(
                (lvl2, index) => {
                  return (
                    <SidebarLink ml="-3" mt="2" key={lvl2.path} href={lvl2.path}>
                      {lvl2.title}
                    </SidebarLink>
                  )
                }
            )}
          </React.Fragment>
        )
      })}
    </>
  )
}

const MainNavLink = ({ href, icon, children }) => {
  const { pathname } = useRouter()
  const [, group] = href.split("/")
  const active = pathname.includes(group)
  const linkColor = useColorModeValue("gray.900", "whiteAlpha.900")

  return (
    <NextLink href={href} passHref>
      <Flex
        as="a"
        align="center"
        fontSize="sm"
        fontWeight="semibold"
        transitionProperty="colors"
        transitionDuration="200ms"
        color={active ? linkColor : "gray.500"}
        _hover={{ color: linkColor }}
      >
        <Center w="6" h="6" bg="teal.400" rounded="base" mr="3">
          {icon}
        </Center>
        {children}
      </Flex>
    </NextLink>
  )
}

const mainNavLinks = [
  {
    icon: <Icon as={MdSettings} color="gray.50" />,
    href: "/CE",
    label: "CE",
  },
  {
    icon: <Icon as={MdSettings} color="gray.50" />,
    href: "/PE",
    label: "PE",
  },
  {
    icon: <Icon as={MdSettings} color="gray.50"/>,
    href: "/config/mgm",
    label: "config",
  },
  {
    icon: <Icon as={MdSettings} color="gray.50" />,
    href: "/help",
    label: "help",
  },
]

const MainNavLinkGroup = (props) => {
  return (
    <List spacing="4" styleType="none" {...props}>
      {mainNavLinks.map((item) => (
        <ListItem key={item.label}>
          <MainNavLink icon={item.icon} href={item.href}>
            {item.label}
          </MainNavLink>
        </ListItem>
      ))}
    </List>
  )
}

const Sidebar = ({routes}) => {
  const { pathname } = useRouter()

  return (
    <Box
      as="nav"
      aria-label="Main Navigation"
      pos="sticky"
      sx={{
        overscrollBehavior: "contain",
      }}
      top="6.5rem"
      w="280px"
      h="calc(((100vh - 1.5rem) - 64px) - 42px);"
      p="8"
      maxH="480px"
      overflowY="auto"
      className="sidebar-content"
      flexShrink={0}
      display={{ base: "none", md: "block" }}
    >
      <MainNavLinkGroup mb="10" />
      <SidebarContent routes={routes} pathname={pathname} />
    </Box>
  )
}

export default Sidebar
