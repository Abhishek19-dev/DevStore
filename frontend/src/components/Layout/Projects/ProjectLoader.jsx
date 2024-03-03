 import React from 'react'; 
 import { Skeleton, SkeletonCircle, SkeletonText, Stack, Wrap } from '@chakra-ui/react'
 
 const ProjectLoader = () =>{
return (
    <>
    <Wrap w='80%' ml='4rem' spacing='3rem' >
    <Skeleton width='20rem' border='0.1px' borderRadius='lg' height='30rem' />
    <Skeleton width='20rem' border='0.1px' borderRadius='lg' height='30rem' />
    <Skeleton width='20rem' border='0.1px' borderRadius='lg' height='30rem' />
    <Skeleton width='20rem' border='0.1px' borderRadius='lg' height='30rem' />
    <Skeleton width='20rem' border='0.1px' borderRadius='lg' height='30rem' />
    <Skeleton width='20rem' border='0.1px' borderRadius='lg' height='30rem' />
    </Wrap>  
    </>
)
};
 
export default ProjectLoader