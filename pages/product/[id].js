import Head from 'next/head'
import {useState, useContext} from 'react'
import {getData, postData, putData} from '../../utils/fetchData'
import {DataContext} from '../../store/GlobalState'
import {addToCart, updateItem} from '../../store/Action'
import ProductShow from '../../components/product/ProductShow'
import Slider from "react-slick"
import Fade from 'react-reveal/Fade'
import Link from 'next/link'

const DetailProduct = (props) => {
    const [product] = useState(props.product)
    const [productsHot] = useState(props.productsHot)
    // const [productComment] = useState(props.productsComment)

    const [tab, setTab] = useState(0)

    const [text, setText] = useState('')
    const [id, setId] = useState('')
 
    const {state, dispatch} = useContext(DataContext)
    const {cart, auth, comment} = state

    const createComment = async() => {
        if(!auth.user) return dispatch({type: 'NOTIFY', payload: {error: 'Please Login before comment.'}})

        if(!text) return dispatch({type: 'NOTIFY', payload: {error: 'Comment can not be left blank.'}})

        dispatch({type: 'NOTIFY', payload: {loading: true}}) 

        
        let res;
        if(id){
            // name = auth.user.name
            res = await putData(`comment/${id}`, {text}, auth.token)
            console.log(res.item)
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
            dispatch(updateItem(comment, id, res.item, 'ADD_COMMENT'))
        } else {
            const productid = product._id;
            // name = auth.user.name
            console.log()
            res = await postData('comment', {text, productid }, auth.token)
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
            dispatch({type: "ADD_COMMENT", payload: [...comment, res.newComment]})
        }

        setId('')
        setText('')
        return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
    }

    const handleEditComment = (item) => {
        setId(item._id)
        setText(item.text)
    }


    const isActive = (index) => {
        if(tab === index) return "active";
        return ""
    }

    const NextArrow = ({onClick}) => {
        return (
        <div className="arrow next" onClick={onClick}>
            <i className="fal fa-chevron-right fal-next" id="right"></i>
        </div>
        )
    }
    
    const PrevArrow = ({onClick}) => {
        return (
        <div className="arrow prev" onClick={onClick}>
            <i className="fal fa-chevron-left fal-prev" id="left"></i>
        </div>
        )
    }

    const imgSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 580,
                settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                initialSlide: 0,
                infinite: true,
                }
            },{
                breakpoint: 375,
                settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                initialSlide: 0,
                infinite: true,
                }
            }
        ]
    }

    const carouselSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
            }
          },{
            breakpoint: 800,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
            }
          }
          
        ]
    }

    return(
        <div className="container" style={{marginTop: '30px'}}>
            <div className="row detail_page">
            <Head>
                <title>Detial Product</title>
            </Head>
            
            <div className="col-lg-6" style={{marginBottom: '50px'}}>
                <img className="img-thumbnail rounded mt-4 w-100 "
                style={{height: '400px', border: '0px', objectFit: 'scale-down', marginBottom: '20px'}}
                src={product.images[tab].url} alt={product.images[tab].url} />

                <div className="row mx-0" style={{cursor: 'pointer'}} >
                    <Slider {...imgSettings}>
                       {product.images.map((img, index) => (
                           <div>
                               <img key={index} src={img.url} alt={img.url}
                                className={`img-thumbnail rounded  ${isActive(index)}`}
                                style={{height: '80px', width: '100%', border: '0' , objectFit: 'scale-down'}}
                                onClick={() => setTab(index)}/>
                           </div>
                        
                        ))} 
                    </Slider>
                    
                </div>
            </div>
            <div className="col-lg-6">
                <h2 className="text-uppercase">{product.title}</h2>
                <h5 className="">฿{product.price}</h5>
                <div className="row d-flex justify-content-between">
                    {
                        product.inStock > 0
                        ? <h6 className="col">In Stock: {product.inStock}</h6>
                        : <h6 className="col text-danger">Out Stock</h6>
                    }
                    <h6 className="col">Sold: {product.sold}</h6>
                </div>

                <div className="my-2">{product.description}</div>

                <div className="my-2">{product.content}</div>
                {
                    auth.user && auth.user.role === 'admin' 
                    ?   <a href={`/create/${product._id}`} className="btn btn-dark px-5"
                        style={{}}>Edit</a>
                    : <button type="button" className="btn btn-dark d-block my-3 px-5 cart-button shadow-none"
                        disabled={product.inStock === 0 ? true : false} 
                        onClick = {() => dispatch(addToCart(product, cart))}>
                            ADD TO CART
                    </button>
                }
                

               </div>
                {
                    !auth.user || auth.user.role === 'admin'
                    ? ''
                    : <div className="input-group mb-3" style={{width: '700px'}}>
                        <input type="text" className="form-control" 
                        placeholder="comment..." value={text} onChange={e => setText(e.target.value)}/>

                        <button className="btn btn-secondary ms-1 shadow-none bg-transparent border-0"
                        onClick={createComment}>
                            <i class="fal fa-paper-plane fs-5 text-dark"></i>
                        </button>
                    </div>
                }
               
                <div>
                {
                    comment.map(item => {
                        
                        if(item.productid === product._id){ 
                            return <div key={item._id} className="my-2 border-bottom" style={{maxWidth: '660px'}}>
                                    <div className="d-flex justify-content-between" >
                                        <div className="mb-2">
                                            <p><b>{item.name}</b> &nbsp; &nbsp;{new Date(item.updatedAt).toLocaleDateString()}</p>
                                            <div>{item.text}</div>                 
                                        </div>
                                        <div style={{cursor: 'pointer'}}>  
                                            {
                                                Object.keys(auth).length === 0 
                                                ? '' 
                                                : ''
                                            }                                             
                                            {
                                                auth.user && auth.user.role === 'admin' 
                                                ? <div>
                                                    <i className="fal fa-trash-alt text-danger"
                                                        data-bs-toggle="modal" data-bs-target="#exampleModal" 
                                                        onClick={() => dispatch({
                                                            type: 'ADD_MODAL', 
                                                            payload: [{ data: comment, id: item._id, title: item.text, type: 'ADD_COMMENT'}]
                                                    })}></i>
                                                </div> 
                                                : ''
                                            }
                                            
                                            {
                                                auth.user && auth.user.name === item.name 
                                                ?  <div>
                                                        <i className="fal fa-trash-alt text-danger"
                                                        data-bs-toggle="modal" data-bs-target="#exampleModal" 
                                                        onClick={() => dispatch({
                                                            type: 'ADD_MODAL', 
                                                            payload: [{ data: comment, id: item._id, title: item.text, type: 'ADD_COMMENT'}]
                                                    })}></i>
                                                </div>
                                                : ''
                                            }                                                                                                                             
                                        </div>

                                    </div>
                                </div>
                        }     
                    })        
                }
                </div>

            

            
            

            <div style={{marginTop: '80px'}}>
                <Fade left>
                    <h4>PRODUCTS OTHER PEOPLE BUY</h4>
                </Fade>                
                <div className="products">
                    <Slider {...carouselSettings}>
                        {
                            productsHot.length === 0
                            ? <h2>No Products</h2>
                            : productsHot.map(product => (
                            <div>
                                <ProductShow key={product._id} product={product} />
                            </div>
                            ))
                        }  
                    </Slider>       
                </div>
            </div>
            
        </div>
        </div>
        
    )
}

export async function getServerSideProps({params: {id}, query}) {
    const page = query.page || 1
    const category = query.category || 'all'
    const sort = query.sort || '-sold'
    const search = query.search || 'all'

    const res = await getData(`product/${id}`)

    const comment = await getData('comment')

    const hot = await getData(
        `product?limit=${page*9}&category=${category}&sort=${sort}&title=${search}`
        )

    return {
      props: {
        product: res.product,
        productsHot: hot.products,
      }, // will be passed to the page component as props
    }
}

export default DetailProduct