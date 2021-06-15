import Link from 'next/link'
import {useContext} from 'react'
import {DataContext} from '../../store/GlobalState'
import Fade from 'react-reveal/Fade'

const ProductNew = ({product}) => {
    const {state, dispatch} = useContext(DataContext)
    const {auth} = state

    return(
        <Link href={`product/${product._id}`}>
            <div className="card" style={{width: '21rem', cursor: 'pointer' }}>
           
                <div className="box">
                    <img className="card-img-top" src={product.images[0].url} alt={product.images[0].url}/>
                    <img className="hover-img" src={product.images[1].url} alt={product.images[1].url}/>
                </div>
                
                <Fade>
                    <div className="position-absolute " 
                    style={{backgroundColor: 'black', height: '50px', width: '50px', borderRadius: '50%', marginLeft: '10px', marginTop: '10px' }}>
                        <h6 className="text-white mt-3 ms-1"><i>NEW</i></h6>
                    </div>
                </Fade>
               

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
                    
                </div>
            </div>
        </Link>
        
    )

}

export default ProductNew