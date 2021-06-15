import React, { useContext, Component } from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {DataContext} from '../store/GlobalState'
import Cookie from 'js-cookie'
import classnames from "classnames";
import Fade from 'react-reveal/Fade'

function NavBar() {
    const router = useRouter()
    const {state, dispatch} = useContext(DataContext)
    const {auth, cart} = state

    

    const isActive = (r) => {
        if(r === router.pathname){
            return " active"
        }else{
            return ""
        }
    }

    const handleLogout = () => {
        Cookie.remove('refreshtoken', {path: 'api/auth/accessToken'})
        localStorage.removeItem('firstLogin')
        dispatch({ type: 'AUTH',payload: {} })
        dispatch({ type: 'NOTIFY', payload: {success: 'Logged out!'} })
        return router.push('/')
    }

    const adminRounter = () => {
        return(
            <>
                <Link href="/users">
                    <a className="dropdown-item" >Account Manager</a>
                </Link>
                <Link href="/create">
                    <a className="dropdown-item" >Add Products</a>
                </Link>
                <Link href="/categories">
                    <a className="dropdown-item" >Add Categories</a>
                </Link>
            </>
        )
    }

    const loggedRouter = () => {
        return(
            <li className="nav-item dropdown" style={{minWidth: '150px'}}>
                <span className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={auth.user.avatar} alt={auth.user.avatar} 
                style={{
                    borderRadius: '50%', width: '30px', height: '30px',
                    transform: 'translateY(-3px)', marginRight: '3px'
                }}/>
                    {auth.user.name}
                </span>
                <div className="dropdown-menu dropdown-menu-start animate slideIn" aria-labelledby="navbarDropdownMenuLink">
                        <Link href="/profile">
                            <a className="dropdown-item" >Profile / Orders</a>
                        </Link>
                        {
                            auth.user.role === 'admin' && adminRounter()
                        }
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item " onClick={handleLogout}>Logout<i class="ms-2 far fa-sign-out"></i></button>                       
                    </div>
            </li>
        )
    }

    
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{marginBottom: ''}}>
            <div className="container-fluid">
                    <div className="logo">
                        <Link href="/">
                            <img src="/woof.png" style={{height: '30px', width: '140px'}}/>
                        </Link>
                    </div>
                                    
                    <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" 
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="toggler-icon top-bar"></span>
                        <span class="toggler-icon middle-bar"></span>
                        <span class="toggler-icon bottom-bar"></span>
                    </button>
                <div class="collapse navbar-collapse navbar-menu justify-content-md-end" id="navbarNavDropdown">
                    <ul className="navbar-nav " style={{cursor: 'pointer'}}>
                        <Link href="/">
                        <li><a className="nav-link active" >HOME</a></li>
                        
                        </Link>
                        <Link href="/shop">
                        <li><a className="nav-link active" >SHOP</a></li>
                        
                        </Link>
                        <Link href="/shop?search=all&sort=-sold">
                        <li><a className="nav-link active" >POPULAR</a></li>
                                     
                        </Link>
                        
                    </ul>
                </div>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown"
                style={{width: '145px'}}>
                    
                <ul className="navbar-nav">
                    {/* <li className="nav-item">
                        <Link href="/like">
                            <i class="fas fa-heart position-relative"></i>
                        </Link>
                    </li> */}                  
                    {
                        auth.user && auth.user.role === 'admin' ? '' 
                        :  <li className="nav-item">
                                <Link href="/cart">
                                    <a className={"nav-link" + isActive('/cart')}>
                                        <i className="fad fa-shopping-cart position-relative" aria-hidden="true">
                                            
                                        </i>
                                        <span className="ms-1 me-2">Cart ( {cart.length} )</span>
                                    </a>
                                </Link>                    
                            </li>
                    }
                    {
                        Object.keys(auth).length === 0
                        ? <li className="nav-item" style={{minWidth: '150px'}}>
                            <Link href="/signin">
                                <a className={"nav-link" + isActive('/singin')}>
                                    <i className="fas fa-user" aria-hidden="true"></i> Sing in
                                    </a>
                                    
                            </Link>   
                                             
                        </li> 
                        
                        : loggedRouter()
                    }

                </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar