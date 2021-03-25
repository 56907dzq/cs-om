import {
    chakra,
    Flex,
    IconButton,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    useUpdateEffect,
  } from "@chakra-ui/react"
import React from "react"
import Image from 'next/image'
import { FaMoon, FaSun } from "react-icons/fa"
import NextLink from "next/link"
import { useViewportScroll } from "framer-motion"
import { MobileNavButton, MobileNavContent } from "components/mobile-nav.tsx"

function HeaderContent() {
  const mobileNav = useDisclosure()
  const { toggleColorMode: toggleMode } = useColorMode()
  const text = useColorModeValue("dark", "light")
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  const mobileNavBtnRef = React.useRef()

  useUpdateEffect(() => {
    if(mobileNavBtnRef.current)
      mobileNavBtnRef.current.focus()
  }, [mobileNav.isOpen])

  return (
    <>
      <Flex w="100%" h="100%" px="6" align="center" justify="space-between">
        <Flex align="center">
          <NextLink href="/CE" passHref>
            <chakra.a display="block" aria-label="Chakra UI, Back to homepage">
              {/* <Logo /> */}
              {/* src="http://localhost:4000/logo.png" */}
              <Image
                src="/logo.png"
                alt="Feixin Logo"
                priority
                width={116}
                height={41}
              />
            </chakra.a>
          </NextLink>
        </Flex>
        <Flex
          justify="flex-end"
          w="100%"
          maxW="824px"
          align="center"
          color="gray.400"
        >
          <IconButton
            size="md"
            fontSize="lg"
            aria-label={`Switch to ${text} mode`}
            variant="ghost"
            color="current"
            ml={{ base: "0", md: "3" }}
            onClick={toggleMode}
            icon={<SwitchIcon />}
          />
          <MobileNavButton
            ref={mobileNavBtnRef}
            aria-label="Open Menu"
            onClick={mobileNav.onOpen}
          />
        </Flex>
      </Flex>
      <MobileNavContent isOpen={mobileNav.isOpen} onClose={mobileNav.onClose} />
    </>
  )
}

function Header(props) {
  const bg = useColorModeValue("white", "gray.800")
  const ref = React.useRef()
  const [y, setY] = React.useState(0)
  const { scrollY } = useViewportScroll()
  const { height = 0 } = function(){
    if(ref.current)
      return ref.current.getBoundingClientRect()
    else
      return {}
  }
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()))
  }, [scrollY])

  return (
    <chakra.header
      ref={ref}
      shadow={y > height ? "sm" : undefined}
      transition="box-shadow 0.2s"
      pos="fixed"
      top="0"
      zIndex="3"
      bg={bg}
      left="0"
      right="0"
      borderTop="6px solid"
      borderTopColor="teal.400"
      width="full"
      {...props}
    >
      <chakra.div height="4.5rem" mx="auto" maxW="1200px">
        <HeaderContent />
      </chakra.div>
    </chakra.header>
  )
}

export default Header