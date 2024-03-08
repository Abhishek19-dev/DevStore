 import React from 'react'; 
 import { Skeleton, Spinner, Stack, Text } from '@chakra-ui/react'
 
 export const SideBarChatLoader = () =>{
return (
    <>
   <Stack direction='column' spacing='1rem' pr='0.5rem'>
  <Skeleton bg='blue' height='70px' border='0.1px' borderRadius='lg' />
  <Skeleton bg='blue' height='70px' border='0.1px' borderRadius='lg' />
  <Skeleton bg='blue' height='70px' border='0.1px' borderRadius='lg' />
  <Skeleton bg='blue' height='70px' border='0.1px' borderRadius='lg' />
  </Stack>
    
    </>
)
};



 
 export const MessageSpinner = () =>{
return (
  <>
 <Spinner size='xl' />
<Text fontFamily='nunito' fontWeight='700'>Loading Messages....</Text>
  </>
)
};
 

 
