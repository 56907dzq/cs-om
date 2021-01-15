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
  
  const DiscordIcon = (props) => (
    <svg viewBox="0 0 146 146" {...props}>
      <path
        fill="currentColor"
        d="M107.75 125.001s-4.5-5.375-8.25-10.125c16.375-4.625 22.625-14.875 22.625-14.875-5.125 3.375-10 5.75-14.375 7.375-6.25 2.625-12.25 4.375-18.125 5.375-12 2.25-23 1.625-32.375-.125-7.125-1.375-13.25-3.375-18.375-5.375-2.875-1.125-6-2.5-9.125-4.25-.375-.25-.75-.375-1.125-.625-.25-.125-.375-.25-.5-.375-2.25-1.25-3.5-2.125-3.5-2.125s6 10 21.875 14.75c-3.75 4.75-8.375 10.375-8.375 10.375-27.625-.875-38.125-19-38.125-19 0-40.25 18-72.875 18-72.875 18-13.5 35.125-13.125 35.125-13.125l1.25 1.5c-22.5 6.5-32.875 16.375-32.875 16.375s2.75-1.5 7.375-3.625c13.375-5.875 24-7.5 28.375-7.875.75-.125 1.375-.25 2.125-.25 7.625-1 16.25-1.25 25.25-.25 11.875 1.375 24.625 4.875 37.625 12 0 0-9.875-9.375-31.125-15.875l1.75-2S110 19.626 128 33.126c0 0 18 32.625 18 72.875 0 0-10.625 18.125-38.25 19zM49.625 66.626c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875.125-7.625-5.625-13.875-12.75-13.875zm45.625 0c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875s-5.625-13.875-12.75-13.875z"
        fillRule="nonzero"
      />
    </svg>
  )
  
  
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
        zIndex="1"
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