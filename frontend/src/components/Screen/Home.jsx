 import React, { Fragment, useEffect } from 'react'; 
import Categories from '../Layout/Categories/Categories';
import FirstSection from '../Layout/FirstSection/FirstSection';
import Domain from '../../components/Layout/Domain/Domain';

import { useDispatch } from 'react-redux';
import { getUserDetailsAction } from '../../Redux/Actions/UserAction';


 
 const Home = () =>{
     const dispatch = useDispatch()
     useEffect(()=>{
       dispatch(getUserDetailsAction())
     },[dispatch])
return (
    <Fragment>
     <FirstSection />
     <Categories  id="categories" />
     <Domain />
     <h2 class=" container  text-4xl font-bold font-nunito mb-4 md:ml-[12vh]">Featured <span className="text-color6">Products</span></h2>
    </Fragment>
)
};
 
export default Home