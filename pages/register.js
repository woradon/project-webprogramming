import Head from 'next/head'
import Link from 'next/link'
import {useState, useContext, useEffect} from 'react'
import valid from '../utils/valid'
import {DataContext} from '../store/GlobalState'
import {postData} from '../utils/fetchData'
import {useRouter} from 'next/router'

const Register = () => {
    const initialState = {name: '', email: '', password: '', cf_password: ''}
    const [userData, setUserData] = useState(initialState)
    const { name, email, password, cf_password } = userData

    const {state, dispatch} = useContext(DataContext)
    const {auth} = state

    const router = useRouter()

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUserData({...userData, [name]:value})
        dispatch ({type: 'NOTIFY', payload: {}})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const errMsg = valid(name, email, password, cf_password)
        
        if(errMsg) return dispatch ({type: 'NOTIFY', payload: {error: errMsg}})
        dispatch ({type: 'NOTIFY', payload: {loading: true}})

        const res = await postData('auth/register', userData)
        if(res.err) return dispatch ({type: 'NOTIFY', payload: {error: res.err}})
        return dispatch ({type: 'NOTIFY', payload: {success: res.msg}}), router.push('/signin') 
        
        
    }

    

    return(
      <div>
        <Head>
          <title>Register Page</title>
        </Head>
        <form className="mx-auto my-4" style={{maxWidth: '500px'}} onSubmit={handleSubmit}>
          <h2>
            REGISTER
          </h2>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control shadow-none" id="name" name="name" value={name} onChange={handleChangeInput}
            style={{}}/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control shadow-none" id="exampleInputEmail1" aria-describedby="emailHelp" 
            name="email" value={email} onChange={handleChangeInput}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control shadow-none" id="exampleInputPassword1"
            name="password" value={password} onChange={handleChangeInput}/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
            <input type="password" className="form-control shadow-none" id="exampleInputPassword2"
            name="cf_password" value={cf_password} onChange={handleChangeInput}/>
          </div>
          
          <button type="submit" className="btn btn-dark w-100 rounded-0 p-2 shadow-none" >Register</button>

          <p className="my-2" >Already have account?
            <Link href="/signin"><a style={{color: 'rgba(229, 28, 76)'}}> Login Now</a></Link>
          </p>
        </form>

      </div>
    )
  }
  
  export default Register