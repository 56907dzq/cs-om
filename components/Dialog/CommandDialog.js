import React, { useState } from 'react'
import { MdAdd } from "react-icons/md"
import {
  Tooltip,
  IconButton,
  Input,
  Button, 
  Switch,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/react"
import PropTypes from 'prop-types'

const initialMGM = {
  command : '',
  description : '',
  name : ''
}


const CommandDialog = props => {
  const {
    addHandler,
  } = props
  //表单数据
  const [data, setdata] = useState(initialMGM)
  //添加多个表单
  const [switchState, setSwitchState] = useState({
    addMultiple: false,
  })
  const handleSwitchChange = () =>  ({ target: { checked } }) => {
    setSwitchState({ addMultiple: checked })
  }
  //重置添加状态
  const resetSwitch = () => {
    setSwitchState({ addMultiple: false })
  }
  //modal状态
  const [ isOpen, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
    resetSwitch()
    setdata(initialMGM)
  }
  //表单autofocus
  const initialRef = React.useRef()
  //受控表单
  const handleChange = name => ({ target: { value } }) => {
    setdata({ ...data, [name]: value })
  }
  //添加
  const handleAdd = event => {
    addHandler(data)
    setdata(initialMGM)
    switchState.addMultiple ? setOpen(true) : setOpen(false)
  }
  return (
    <div>
      <Tooltip label="Add" >
        <IconButton 
          isRound
          fontSize="20px"
          variant="ghost"
          aria-label="add" 
          bgColor = "transparent"
          _hover={{ background: "rgba(0, 0, 0, 0.24)" }}
          icon={<MdAdd />} 
          onClick={() => setOpen(true)}
        />
      </Tooltip>
      <Modal
        size="lg"
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={() => setOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Add Check Command </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>command</FormLabel>
              <Input 
                variant="flushed" 
                value={data.command} 
                ref={initialRef} 
                placeholder="操作命令"
                onChange={handleChange('command')} />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>name</FormLabel>
              <Input 
                variant="flushed" 
                value={data.name} 
                placeholder="操作命令简称"
                onChange={handleChange('name')} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>description</FormLabel>
              <Input 
                variant="flushed" 
                value={data.description} 
                placeholder="命令描述"
                onChange={handleChange('description')} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Tooltip placement="auto" label="Add multiple" openDelay={500} closeDelay={200}>         
              <Switch 
                mr={6} 
                id="add-multiple" 
                aria-label="add-multiple checkbox" 
                isChecked={switchState.addMultiple}
                onChange={handleSwitchChange()}
              />
            </Tooltip>
            <Button  onClick={handleAdd} colorScheme="blue" mr={3}>
              Submit
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

CommandDialog.propTypes = {
  addHandler: PropTypes.func.isRequired,
}

export default CommandDialog
