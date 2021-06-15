import Head from 'next/head'
import Link from 'next/link'
import { useContext } from 'react'
import { DataContext} from '../store/GlobalState'
import {useRouter} from 'next/router'

const Users = () => {
    const {state, dispatch} = useContext(DataContext)
    const {users, auth, modal} = state
    const router = useRouter()

    
    if( !auth.user || auth.user && auth.user.role !== 'admin') return router.back();
    return(
        <div className="user container" style={{marginTop: '20px'}}>
            <Head>
                <title>Users</title>
            </Head>
            <h4 className="mb-5">Account Manager</h4>
            <table className="table table-user w-100 ">
            
                <thead>
                    <tr>
                        {/* <th scope="col" ></th> */}
                        <th scope="col" style={{width: '10%'}}>Avatar</th>
                        <th scope="col" style={{width: '20%'}}>Name</th>
                        <th scope="col" style={{width: '40%'}}>Email</th>
                        <th scope="col" style={{width: '20%'}}>Role</th>
                        <th scope="col" style={{width: '10%'}}>Action</th>  
                    </tr>
                    
                </thead>

                <tbody>
                    {
                        users.map((user, index) =>(
                            <tr key={user._id} style={{cursor: 'pointer'}}>
                                
                                {/* <td>{index + 1}</td> */}
                                <td  scope="row" data-label="Avatar">
                                    <img src={user.avatar} alt={user.avatar} 
                                    style={{
                                        width: '30px' , height: '30px',
                                        overflow: 'hidden', objectFit: 'cover', borderRadius: '50%'
                                        }}  />
                                </td>
                                <td  data-label="Name" >{user.name}</td>
                                <td  data-label="Email" >{user.email}</td>
                                <td  data-label="Role" >
                                    {
                                        user.role === 'admin'
                                        ? user.root ? <i className="text-success">Master Admin</i>
                                                    : <i className="text-success">Admin</i>
                                        : <i className="text-danger">User</i>
                                    }
                                </td>
                                <td  data-label="Action">
                                    <Link href={
                                        auth.user.root && auth.user.email !== user.email
                                        ? `/edit_user/${user._id}` : ''
                                    }>
                                        {
                                           auth.user.root && auth.user.email !== user.email
                                           ? <a><i className="fal fa-user-edit text-info mr-2" title="Edit User"
                                           style={{marginRight: '25px'}}></i></a>
                                            : <a><i class="fas fa-ban text-danger ms-3"></i></a>
                                        }
                                       
                                    </Link>

                                    {
                                        auth.user.root && auth.user.email !== user.email
                                        ? <i className="fal fa-trash-alt text-danger ml-2" title="Remove User"
                                        data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() => dispatch({
                                            type: 'ADD_MODAL',
                                            payload: [{ data: users, id: user._id, title: user.name, type: 'ADD_USERS' }]
                                        })}></i>
                                        
                                        : ''
                                    }

                                </td>  
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    )
}

export default Users