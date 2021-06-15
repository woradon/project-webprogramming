import Link from 'next/link'
import PaypalBtn from './paypalBtn'
import {patchData} from '../utils/fetchData'
import {updateItem} from '../store/Action'

const OrderDetail = ({orderDetail, state, dispatch}) => {
    const {auth, orders} = state
  
    const handleDelivered = (order) => {
        dispatch({type: 'NOTIFY', payload: {loading: true}})
        patchData(`order/delivered/${order._id}`, null, auth.token)
        .then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
            
            const {  dateOfDelivered, method, delivered } = res.result

            dispatch(updateItem(orders, order._id, {
                ...order, dateOfDelivered, method, delivered   
            },'ADD_ORDERS'))
            return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
        })
    }

    
    if(!auth.user) return null;
    return (
    <>
        {   
            orderDetail.map(order => (
            <div key={order._id} style={{ margin: "20px auto" }} className="row justify-content-around">
                <div key={order._id} className="col-8 text-uppercase my-3" style={{maxWidth: '600px'}}>
                    <h2 className="text-break">Order {order._id}</h2>
                    
                    <div className="mt-4 text-secondary">
                    <div className="row">
                        <h3 className="col-6">Shipping to</h3>
                        {
                            order.paid
                            ? ''
                            : <h5 className="text-danger col-6 text-end pt-2" title="Remove Order"
                            data-bs-toggle="modal" data-bs-target="#exampleModal" style={{cursor: 'pointer'}}
                            onClick={() => dispatch({
                                type: 'ADD_MODAL',
                                payload: [{ data: orders, id: order._id, title: order._id, type: 'ADD_ORDERS' }]
                            })}><u>edit</u></h5>
                        }
                        
                    </div>
                    {
                        auth.user.role === 'user' ? ''
                        : <div>
                            <p>Name: {order.user.name}</p>
                            <p>Email: {order.user.email}</p>
                        </div>                        
                    }
                    
                    <p>Address: {order.address}</p>
                    <p>Mobile: {order.mobile}</p>

                    <div
                        className={`alert ${order.delivered ? "alert-success" : "alert-danger"}
                        d-flex justify-content-between align-item-center`} role="alert">
                        {
                            order.delivered 
                            ? <p>
                                Delivered on {new Date(order.dateOfDelivered).toLocaleDateString()}&nbsp;&nbsp;
                                {new Date(order.dateOfDelivered).toLocaleTimeString()}
                            </p>  
                            : "Not Delivered"}
                        {
                            
                            auth.user.role === 'admin' && !order.delivered &&
                            <button className="btn btn-dark text-uppercase"
                            onClick={() => handleDelivered(order)}>
                                Mark as delivered
                            </button> 
                        }
                    </div>
                    <h3>Payment</h3>
                    {
                        order.method && <h6>Method: <em>{order.method}</em></h6>
                    }
                    {
                        order.paymentId && <p>Payment Id: <em>{order.paymentId}</em></p>
                    }
                    <div
                        className={`alert ${order.paid ? "alert-success" : "alert-danger"}
                        d-flex justify-content-between align-item-center`} role="alert">
                        {order.paid 
                        ?
                        <p>
                            Paid on {new Date(order.dateOfPayment).toLocaleDateString()}&nbsp;&nbsp;
                            {new Date(order.dateOfPayment).toLocaleTimeString()}
                        </p>
                        : "Not Paid"}
                    </div>
                    <div>
                        <h3>Order Items</h3>
                        {order.cart.map((item) => (
                        <div
                            className="row border-bottom mx-0 p-2 justify-content-between align-items-center"
                            key={item._id}
                            style={{ maxWidth: "600px" }}
                        >
                            <div className="col-3">
                            <img
                                className=""
                                src={item.images[0].url}
                                alt={item.images[0].url}
                                style={{
                                width: "120px",
                                height: "85px",
                                objectFit: "cover",
                                }}
                            />
                            </div>
                            <div className="col-5">
                            <h5 className="flex-fill text-secondary ">
                                <Link href={`/product/${item._id}`}>
                                <a>{item.title}</a>
                                </Link>
                            </h5>
                            </div>
                            <div className="col-4">
                            <span className="text">
                                <span>
                                {item.quantity} x ${item.price}
                                </span>
                                <span> = ฿ {item.price * item.quantity}</span>
                            </span>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>
                {
                    !order.paid && auth.user.role !== 'admin' &&
                    <div className="col-4 p-4">
                        <h2 className="mb-4 text-uppercase">Total: ฿ {order.total}</h2>
                        <PaypalBtn order={order} />
                    </div>   
                }                 
                

            </div>
            ))
        }
    </>
  );
};

export default OrderDetail;
