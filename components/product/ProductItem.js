import Link from 'next/link'
import {useContext} from 'react'
import {DataContext} from '../../store/GlobalState'


const ProductItem = ({product, handleCheck}) => {
    const {state, dispatch} = useContext(DataContext)
    const {auth} = state


    const userLink = () => {
        return(
            <>
                <Link href={`product/${product._id}`}>
                    <a className="btn btn-dark shadow-none .viewbtn"
                    style={{marginRight: '0px', flex: 1}}>View</a>
                </Link>
            </>
        )
    }

    const adminLink = () => {
        return(
            <>
                <div className="row">
                    <Link href={`product/${product._id}`}>
                        <a className="btn btn-dark col-10 shadow-none"
                        style={{marginRight: '0px', width: '250px'}}>View</a>
                    </Link>
                    <div class="dropdown btn-down col-1">
                    <button class="btn dropdown-toggle shadow-none" type="button" id="" data-bs-toggle="dropdown" aria-expanded="false"
                    style={{marginLeft: '0px'}}>
                        <i class="fs-4 far fa-bars"></i>
                    </button>
                    <ul class="dropdown-menu " aria-labelledby="dropdownMenuButton1">
                        <Link href={`create/${product._id}`}>
                        <a className="dropdown-item">Edit Product</a>
                        </Link>
                        <button className="dropdown-item"
                        data-bs-toggle="modal" data-bs-target="#exampleModal" 
                        onClick={() => dispatch({
                            type: 'ADD_MODAL', 
                            payload: [{ 
                                data: '', id: product._id, 
                                title: product.title, type: 'DELETE_PRODUCT'
                            }]
                        })} >
                            Delete Product
                        </button>  
                    </ul>
                    </div>
                </div>
                
                {/* <Link href={`create/${product._id}`}>
                    <a className="btn btn-dark"
                    style={{marginRight: '5px', flex: 1}}>Edit</a>
                </Link>
                <button className="btn btn-danger"
                style={{marginLeft: '5px', flex: 1}}
                data-bs-toggle="modal" data-bs-target="#exampleModal" 
                onClick={() => dispatch({
                    type: 'ADD_MODAL', 
                    payload: [{ 
                        data: '', id: product._id, 
                        title: product.title, type: 'DELETE_PRODUCT'
                    }]
                })} >
                    Delete
                </button> */}
            </>
        )
    }

    
    return (
        <div className="card" >
            
            
            <div className="box">
                <img className="card-img-top" src={product.images[0].url} alt={product.images[0].url}/>
                <img className="hover-img" src={product.images[1].url} alt={product.images[1].url}/>
            </div>
            
            {
                auth.user && auth.user.role === 'admin' &&
                <input type="checkbox" checked={product.checked}
                className="position-absolute "
                style={{height: '20px', width: '20px'}}
                onChange={() => handleCheck(product._id)}/>
            }

            <div className="card-body ">
                <h6 className="card-title text-capitalize" title={product.title}>{product.title}</h6>
                <div className="row justify-content-between ">
                    <h6 className="col ">฿ {product.price}</h6>
                    {
                        product.inStock > 0
                        ? <h6 className="col text-end">In Stock: {product.inStock}</h6>
                        : <h6 className="col text-danger text-end">Out Stock</h6>
                    }
                </div>

                <div className="row justify-content-between mx-0">
                    {!auth.user || auth.user.role !== 'admin' ? userLink() : adminLink()}
                </div>
                
            </div>
        </div>
    )
}

export default ProductItem