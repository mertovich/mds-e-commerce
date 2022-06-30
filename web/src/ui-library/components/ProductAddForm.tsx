import {
  Box,
  VStack,
  Input,
  NumberInput,
  NumberInputStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Text,
  InputGroup,
  InputLeftAddon,
  Select,
  useToast,
} from '@chakra-ui/react'
import React, { useState } from 'react'

type Props = {}

const ProductAddForm = (props: Props) => {
  const [name, setName] = useState<string>('')
  const [imageLink, setImageLink] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [price, setPrice] = useState<number>(0)

  const toast = useToast()

  const submithandler = () => {
    validate()
  }

  const validate = () => {
    if (name !== '' && imageLink !== '' && description !== '' && category !== '' && price !== 0) {
      toastMessage('Success', 'Product added successfully', 'success', 3000, 'bottom-right')
    } else { 
      toastMessage('Error', 'Please fill all the fields', 'error', 3000, 'bottom-right')
    }
  }

  const toastMessage = (title: string, message: string, statusType: any = 'error', durationValue: number = 9000, positionValue: any = 'top-right') => {
    toast({
      title: title,
      description: message,
      position: positionValue,
      status: statusType,
      duration: durationValue,
      isClosable: true,
    })
  }

  return (
    <Box>
      <Box
        width={'50%'}
        margin={'auto'}
        textAlign={'center'}
      >
        <Text textAlign={'center'} fontSize={'2xl'} >New Product</Text>
        <VStack
          marginTop={'3%'}
          marginBottom={'3%'}
          align={'start'}
        >
          <Input onChange={(e) => setName(e.target.value)} placeholder='Product Name' />
          <Input onChange={(e) => setImageLink(e.target.value)} placeholder='Product image link' />
          <Input onChange={(e) => setDescription(e.target.value)} placeholder='Product Description' />
          <Select onChange={(e) => setCategory(e.target.value)} placeholder='Category'>
            <option value='table'>Table</option>
            <option value='chair'>Chair</option>
            <option value='seat'>Seat</option>
            <option value='cupboard'>Kitchen cupboard</option>
            <option value='countertops'>Kitchen countertops</option>
            <option value='dinner table'>Dinner table</option>
            <option value='armchair'>Garden armchair</option>
            <option value='garden table'>Garden table</option>
            <option value='accessory'>Garden accessory</option>
          </Select>
          <InputGroup>
            <InputLeftAddon children='Price' />
            <NumberInput
              defaultValue={0}
              width={'100%'}
            >
              <NumberInputField onChange={(e) => setPrice(parseInt(e.target.value))}  />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </InputGroup>
        </VStack>
        <Button onClick={() => submithandler()} variant={'solid'} colorScheme={'green'} >Add Product</Button>
      </Box>
    </Box>
  )
}

export default ProductAddForm