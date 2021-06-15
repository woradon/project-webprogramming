import connectDB from '../../../../utils/connectDB'
import Orders from '../../../../models/orderModel'
import auth from '../../../../middleware/auth'
import Products from '../../../../models/productModel'


connectDB() 

export default async (req, res) => {
    switch(req.method){
        case "PATCH":
            await deliveredOrder(req, res)
            break;
    }
}

const deliveredOrder = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin')
        return res.status(400).json({err: 'Authentication is not valid.'})
        const {id} = req.query

        const order = await Orders.findOne({_id: id})
        if(order.paid){
            await Orders.findOneAndUpdate({_id : id}, { delivered: true })
            res.json({
                msg: 'Update success!',
                result: {
                    paid: true, 
                    updatedAt: order.updatedAt, 
                    method: order.method, 
                    delivered: true,
                    dateOfDelivered: new Date().toISOString()
                }
            })
        }else return res.status(400).json({err: 'The customer has not paid'})
        

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}