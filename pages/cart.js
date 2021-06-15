import Head from 'next/head'
import {useContext, useState, useEffect} from 'react'
import {DataContext} from '../store/GlobalState'
import CartItem from '../components/CartItem'
import Link from 'next/link'
import {getData, postData} from '../utils/fetchData'
import PaypalBtn from '../components/paypalBtn'
import {useRouter} from 'next/router'
import Fade from 'react-reveal/Fade'


const Cart = () => {
  const {state,dispatch} = useContext(DataContext)
  const {cart, auth, orders} = state
  
  const [total, setTotal] = useState(0)
  const [address, setAddress] = useState('')
  const [mobile, setMobile] = useState('')
  const [payment, setPayment] = useState(false)

  const [callback, setCallback] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + (item.price * item.quantity)
      },0)
      setTotal(res)
    }

    getTotal()
  },[cart])

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem('__next__cart01__shop'))
    if(cartLocal && cartLocal.length > 0){
      let newArr = []
      const updateCart = async () => {
        for (const item of cartLocal){
          const res = await getData(`product/${item._id}`)
          const {_id, title, images, price, inStock, sold} = res.product
          if(inStock > 0){
            newArr.push({
              _id, title, images, price, inStock, sold,
              quantity: item.quantity > inStock ? 1 : item.quantity
            })
          }
        }

        dispatch({ type: 'ADD_CART', payload: newArr})
      }

      updateCart()
    }
  },[callback])

  const handlePayment = async () => {
    if(!auth.user)return dispatch({ type: 'NOTIFY', payload: {error: 'Please login.'}})

    if(!address || !mobile)
    return dispatch({ type: 'NOTIFY', payload: {error: 'Please add your address and mobile.'}})

    let newCart = [];
    for(const item of cart){
      const res = await getData(`product/${item._id}`)
      if(res.product.inStock - item.quantity >= 0){
        newCart.push(item)
      }
    }
    
    if(newCart.length < cart.length){
      setCallback(!callback)
      return dispatch ({ type: 'NOTIFY', payload: {error: 'The product is out of stock or the quantity is insufficient.'}})
    }

    dispatch ({ type: 'NOTIFY', payload: {loading: true} })

    postData('order', {address, mobile, cart, total}, auth.token)
    .then(res => {
      if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err}})

      dispatch({ type: 'ADD_CART', payload: []})
      const newOrder = {
        ...res.newOrder,
        user: auth.user
      }
      dispatch({ type: 'ADD_ORDERS', payload: [...orders, res.newOrder]})
      dispatch({ type: 'NOTIFY', payload: {success: res.msg}})
      return router.push(`/order/${res.newOrder._id}`)
    })

  }
  
  if(auth.user && auth.user.role === 'admin') return router.back();
  if(cart.length === 0) return <Fade><img className="img-cart img-responsive w-100 "  src="/emptycart.png" alt="not empty"/></Fade>
  return(
    <div className="container" style={{marginTop: '30px'}}>
      <div className="row mx-auto" style={{minHeight: '520px'}}>
              <Head>
                <title>Cart Page</title>
              </Head>
              <div className="col-lg-8 text-secondary table-responsive my-3">
                <h2 className="text-uppercase">Shopping Cart</h2>
                <table className="table my-3">
                  <tbody>
                    {
                      cart.map(item => (
                        <CartItem key={item._id} item={item} dispatch={dispatch} cart={cart} />
                      ))
                    }
                  </tbody>
                </table>
              </div>
              <div className="col-lg-4 my-3 text-end text-uppercase text-secondary">
                    <form>
                      <h2>Shipping</h2>
                      <label htmlFor="address">Address</label>
                      <input type="text" name="address" id="address"
                      className="form-control mb-2" value={address}
                      onChange={e => setAddress(e.target.value)}/>

                      <label htmlFor="mobile">Mobile</label>
                      <input type="text" name="mobile" id="mobile"
                      className="form-control mb-2" value={mobile}
                      onChange={e => setMobile(e.target.value)}/>
                    </form>

                    <h3>Total: <span className="text-dark">฿{total}</span></h3>
                    
                      
                    <Link href={auth.user ? '#!' : '/signin'}>
                      <a className="btn btn-dark my-2" onClick={handlePayment}>Proceed order</a>
                    </Link>
                    
                    
              </div>
            </div>
    </div>
      
    )
  }
  
  export default Cart