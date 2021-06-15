import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import valid from '../utils/valid'
import { patchData } from '../utils/fetchData'
import { imageUpload } from '../utils/imageUpload'
import Link from 'next/link'

const Profile = () => {
    const initialState = {
        avatar: '',
        name: '',
        password: '',
        cf_password: ''
    }
    const [data, setData] = useState(initialState)
    const { avatar, name, password, cf_password} = data
    const {state, dispatch} = useContext(DataContext)
    const {auth, notify, orders} = state
    const [show, setShow] = useState(false)

    useEffect(() => {
        if(auth.user)setData({...data, name: auth.user.name })    
    },[auth.user])

    const handleChange = (e) => {
        const {name, value} = e.target
        setData({...data, [name]:value })
        dispatch({ type: 'NOTIFY', payload: {} })
    }

    const handleUpdateProfile = e => {
        e.preventDefault()
        if(password){
            const errMsg = valid(name, auth.user.email, password, cf_password)
            console.log(errMsg)
            if(errMsg) return dispatch({ type: 'NOTIFY', payload: {error: errMsg} })
            updatePassword()
        }
        
        if(name !== auth.user.name || avatar) updateInfor()
    }

    const updatePassword = () => {
        dispatch({type: 'NOTIFY', payload: {loading: true}})
        patchData('user/resetPassword', {password}, auth.token)
        .then(res => {
            if(res.err) return dispatch({ type: 'NOTIFY', payload: {err: res.err}})
            return dispatch({ type: 'NOTIFY', payload: {success: res.msg}})
        })
    }

    const changeAvatar = (e) => {
        const file = e.target.files[0]
        if(!file)
            return dispatch({type: 'NOTIFY', payload: {error: 'File does not exist.'}})

        if(file.size > 1024 * 1024 )
            return dispatch({type: 'NOTIFY', payload: {error: 'The largest image size is 1mb.'}})

        if(file.type !== "image/jpeg" && file.type !== "image/png") 
            return dispatch({type: 'NOTIFY', payload: {error: 'Image format is incorrect.'}})

        setData({...data, avatar: file})
    }

    const updateInfor = async() => {
        let media;
        dispatch({type: 'NOTIFY', payload: {loading: true}})
        
        if(avatar) media = await imageUpload([avatar])
        
        patchData('user', {
            name, avatar: avatar ? media[0].url : auth.user.avatar
        }, auth.token).then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

            dispatch({type: 'AUTH', payload: {
                token: auth.token,
                user: res.user
            }})
            return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
        })
    }


    if(!auth.user) return null;
    return(
        <div className="profile_page container">
            <Head>
                <title>Profile</title>
            </Head>

            <section className="row text-secondary my-3">
                <div className="col-xl-4 " >
                    <h3 className="text-center text-uppercase"> 
                        {auth.user.role === 'user' ? 'Your Profile' : 'Admin Profile'}
                    </h3>
                    <div className="avatar">
                        <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
                        alt="avatar"/>
                        <span>
                            <i class="fal fa-camera-alt"></i>
                            <p>Change</p>
                            <input type="file" name="file" id="file_up"
                            accept="image/*" onChange={changeAvatar}/>
                        </span>
                    </div>

                    <div className="form-group" style={{}}>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={name}
                        className="form-control" placeholder="Your name" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" defaultValue={auth.user.email}
                        className="form-control" disabled={true}/>
                    </div>
                    <button className="btn btn-outline-primary btn-sm shadow-none" id="change" onClick={() => setShow(!show)}>Change Password</button>
                    {
                        show ? 
                            <div>
                                 <div className="form-group">
                                    <label htmlFor="password">New Password</label>
                                    <input type="password" name="password" value={password}
                                    className="form-control" placeholder="" onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cf_password">Confirm New Password</label>
                                    <input type="password" name="cf_password" value={cf_password}
                                    className="form-control" placeholder="" onChange={handleChange} />
                                </div>
                                {/* <button className="btn btn-outline-danger btn-sm" onClick={() => setShow(false)}>cancel</button> */}
                            </div>
                        : null
                    }

                    <div className="d-md-flex justify-content-md-end " style={{marginBottom: '30px'}}>
                        <button className="btn btn-dark col-4 shadow-none" id="update"disabled={notify.loading} onClick={handleUpdateProfile}>Update</button>
                    </div>
                </div>
                <div className="col-xl-8 ">
                    <h3 className="text-uppercase">Orders</h3>
                    <div className="my-3 table-responsive">
                        <table className="table-bordered table-hover w-100 text-uppercase"
                        style={{minWidth: '600px', }}>
                            <thead className="bg-light font-weight-bold">
                                <tr>
                                    <td className="p-2">order</td>
                                    <td className="p-2">date</td>
                                    <td className="p-2">total</td>
                                    <td className="p-2">delivered</td>
                                    <td className="p-2">paid</td>
                                    <td className="p-2">action</td>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    orders.map(order => (
                                        <tr key={order._id}>
                                            
                                            <td className="p-2">
                                                <span >Order id : </span>                                          
                                                <Link href={`/order/${order._id}`} > 
                                                    <a> {order._id}</a>
                                                </Link>
                                                {
                                                    order.cart.map((item) => (
                                                        <div className="row">
                                                            <div className="col-xl-4 col-lg-5 col-md-6">
                                                                <img src={item.images[0].url} 
                                                                style={{width: "120px", height: "85px", objectFit: "cover",
                                                                marginBottom: '5px', marginRight: '5px', marginTop: '5px'}}>                                                               
                                                                </img>
                                                            </div>
                                                            
                                                            <div className="col-xl-8 col-lg-7 col-md-6 pt-4">
                                                                <Link href={`/order/${order._id}`}>
                                                                    <a className="">{item.title}</a>
                                                                </Link> 
                                                            </div>
                                                        </div>
                                                        
                                                    ))
                                                }
                                                {/* <Link href={`/order/${order._id}`}>
                                                    <a>{order._id}</a>
                                                </Link> */}
                                            </td>
                                            <td className="p-2 ">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="p-3">฿{order.total}</td>
                                            <td className="p-2">
                                                {
                                                    order.delivered
                                                    ? <div className="text-success">
                                                        <span>Complete</span>
                                                    </div>
                                                    : <i className="fas fa-times text-danger"></i>
                                                }
                                            </td>
                                            <td className="p-2">
                                                {
                                                    order.paid
                                                    ? <i className="text-success">YES</i>
                                                    : <i className="text-danger">NO</i>
                                                }
                                            </td>
                                            <td className="p-2"> 
                                                {
                                                    
                                                    order.paid
                                                    ? <i class="fas fa-ban text-danger ms-3"></i>
                                                    : <i className="fal fa-trash-alt text-danger ml-2" title="Remove Order"
                                                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                    onClick={() => dispatch({
                                                        type: 'ADD_MODAL',
                                                        payload: [{ data: orders, id: order._id, title: order._id, type: 'ADD_ORDERS' }]
                                                    })}></i>
                                                }

                                            </td>


                                            
                                        </tr>
                                    ))
                                }
                            </tbody>

                        </table>
                    </div>
                </div>
            </section>
        </div>
        
    )
}

export default Profile