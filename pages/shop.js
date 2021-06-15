import { getData } from '../utils/fetchData'
import { useState, useContext, useEffect } from 'react'
import {DataContext} from '../store/GlobalState'
import Head from 'next/head'
import ProductItem from '../components/product/ProductItem'
import filterSearch from '../utils/filterSearch'
import {useRouter} from 'next/router'
import Filter from '../components/Filter'
import Fade from 'react-reveal/Fade'


const Shop = (props) => {
    const [products, setProducts] = useState(props.products)

    const [isCheck, setIsCheck] = useState(false)
    const [page, setPage] = useState(1)
    const router = useRouter()

    const {state, dispatch} = useContext(DataContext)
    const {auth} = state

    useEffect(() => {
      setProducts(props.products)
    },[props.products])
  
    useEffect(() => {
      if(Object.keys(router.query).length === 0) setPage(1)
    },[router.query])
  
    const handleCheck = (id) => {
      products.forEach(product => {
        if(product._id === id) product.checked = !product.checked
      })
      setProducts([...products])
    }
  
    const handleCheckALL = () => {
      products.forEach(product => product.checked = !isCheck)
      setProducts([...products])
      setIsCheck(!isCheck)
    }
  
    const handleDeleteAll = () => {
      let deleteArr = [];
      products.forEach(product => {
        if(product.checked){
            deleteArr.push({
              data: '', 
              id: product._id, 
              title: 'Delete all selected products?', 
              type: 'DELETE_PRODUCT'
            })
        }
      })
  
      dispatch({type: 'ADD_MODAL', payload: deleteArr})
    }
  
    const handleLoadmore = () => {
      setPage(page + 1)
      filterSearch({router, page: page + 1 })
    }

    const scrollTop = () =>{
      window.scrollTo({top: 0, behavior: 'smooth'});
   };

    return(
      <div className="home_page container" style={{marginBottom: '100px', minHeight: '530px'}}>
        <Head>
            <title>Shop Page</title>    
        </Head>

        <Filter state={state}/>

        {
            auth.user && auth.user.role === 'admin' &&
            <div className="delete_all mt-2 ms-5" style={{marginBottom: '-10px'}}>           
              <input type="checkbox" checked={isCheck} onChange={handleCheckALL}
              style={{width: '20px', height: '20px', transform: 'translateY(8px)'}}/>
              <label className="btn" style={{cursor: ''}}>
                Select all
              </label>
              <button className="btn btn-danger " style={{marginLeft: '5px'}}
              data-bs-toggle="modal" data-bs-target="#exampleModal" 
              onClick={handleDeleteAll}>
                Delete select
              </button>
            </div>
        }
        <div className="products">
          <div className="productgap ">
            {
                products.length === 0
                ? <div className="text-center position-absolute top-50 start-50 translate-middle-x " style={{margin: ''}}>
                    <h1 style={{fontSize: '100px'}}>\(o_o)/</h1>
                    <h2>Can’t find any products.</h2>
                  </div>

                : products.map(product => ( 
                    <ProductItem key={product._id} product={product} handleCheck={handleCheck}/>
                ))
            }  
          </div>
            

        </div>
        <div>
        <div className="position-relative" 
        style={{marginTop: '50px'}}>
        {
            props.result < page * 9 ? ""
            : <div className="position-absolute top-0 start-50 translate-middle">
              <Fade bottom>
                <button className="btn btn-outline-dark d-block rounded-pill shadow-none"
                onClick={handleLoadmore}>
                  Load more 
                  <i class="far fa-angle-double-down ms-2"></i>
                </button>
              </Fade>
            </div>
            
          }
          <div class="position-absolute top-0 start-100 translate-middle" >
            <Fade bottom>
              <button className="btn btn-outline-dark rounded-circle shadow-none " 
              style={{height: '40px', width: '40px'}}
              onClick={scrollTop}> 
                      <i class="fas fa-arrow-up "></i>
              </button>
            </Fade>
            
          </div>
        </div>
        </div>
          

        
        
        
      </div>
    )
  }

export async function getServerSideProps({query}) {
    const page = query.page || 1
    const category = query.category || 'all'
    const sort = query.sort || ''
    const search = query.search || 'all'

    const res = await getData(
      `product?limit=${page * 9}&category=${category}&sort=${sort}&title=${search}`
      )
    return {
      props: {
          products: res.products,
          result: res.result
      }, 
    }
}
  
  export default Shop