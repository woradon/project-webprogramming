import React, {useContext} from 'react'
import NavBar from './NavBar'
import Notify from './Notify'
import Modal from './Modal'
import Footer from './Footer'
import {useRouter} from 'next/router'
import {DataContext} from '../store/GlobalState'


function Layout({children}) {
    const router = useRouter()
    const showFooter = router.pathname === '/signin'  ? false : true;
    const showFooter2 = router.pathname === '/register'  ? false : true;
    const showFooter3 = router.pathname === '/users'  ? false : true;
    const showFooter4 = router.pathname === '/categories'  ? false : true;
    const showFooter5 = router.pathname === '/profile'  ? false : true;
    
    const {state, dispatch} = useContext(DataContext)
    const {auth, cart} = state

    return (
        <div >
            <div className="ps-3 pe-3 pt-2">
                <NavBar/>
            </div>
            <div className="">
                
                <Notify/>
                <Modal/>
                {children}
            </div>
            {
                auth.user && auth.user.role === 'admin'
                ? ''
                : <div >
                    {showFooter && showFooter2 && showFooter5  && <Footer/>}
                </div>
            }
            
        </div>
    )
}

export default Layout