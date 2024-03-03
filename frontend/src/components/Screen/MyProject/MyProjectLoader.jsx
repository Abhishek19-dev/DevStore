 import React from 'react'; 
 import { Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react'

 
 const MyProjectLoader = () =>{
return (
    <>
    <Stack  mb='2rem' w='80%' ml='8rem' mt='1rem'>
  <Skeleton border='0.1px' borderRadius='lg' height='15rem' />
  <Skeleton border='0.1px' borderRadius='lg' height='15rem' />
</Stack>
    </>
)
};
 
export default MyProjectLoader 