import React, { useState } from 'react'
import { MdAdd } from "react-icons/md"
import {
  Tooltip,
  IconButton,
  Input,
  Button, 
  Switch,
  Spinner, 
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
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
  key_file : '',
  server_ip : '',
  login_username : '',
  login_password : '',
  description : '',
  server_name : ''
}


const MGMDialog = props => {
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
          <ModalHeader> Add MGM </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>key_file</FormLabel>
              <Input 
                variant="flushed" 
                value={data.key_file} 
                ref={initialRef} 
                placeholder="ssh密钥存储位置"
                onChange={handleChange('key_file')} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>server_ip</FormLabel>
              <Input 
                variant="flushed" 
                value={data.server_ip} 
                placeholder="MGM服务器IP"
                onChange={handleChange('server_ip')} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>login_username</FormLabel>
              <Input 
                variant="flushed" 
                value={data.login_username} 
                placeholder="登录用户名"
                onChange={handleChange('login_username')} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>login_password</FormLabel>
              <Input 
                variant="flushed" 
                value={data.login_password} 
                placeholder="登录密码"
                onChange={handleChange('login_password')} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>server_name</FormLabel>
              <Input 
                variant="flushed" 
                value={data.server_name} 
                placeholder="MGM服务器名称"
                onChange={handleChange('server_name')} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>description</FormLabel>
              <Input 
                variant="flushed" 
                value={data.description} 
                placeholder="MGM服务器描述"
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
        {/* <DialogContent>
        
          <TextField
            margin="dense"
            label="Profile Progress"
            type="number"
            fullWidth
            value={user.progress}
            onChange={handleChange('progress')}
          />
        </DialogContent> */}
    </div>
  )
}

MGMDialog.propTypes = {
  addHandler: PropTypes.func.isRequired,
}

export default MGMDialog
