import connectDB from '../../../utils/connectDB'
import Comment from '../../../models/commentModel'
import auth from '../../../middleware/auth'

connectDB() 

export default async (req, res) => {
    switch(req.method){
        case "PUT" :
            await updateComment(req, res)
            break;
        case "DELETE" :
            await deleteComment(req, res)
            break;
    }
}

const updateComment = async (req, res) => {
    try {
        
        const {id} = req.query
        const {text} = req.body
        const {productid} = req.body

        const newComment = await Comment.findOneAndUpdate({_id: id}, {text,productid})
        res.json({
            comment: {
                ...newComment._doc,
                text,
                productid
            }
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const deleteComment = async (req, res) => {
    try {
        // const result = await auth(req, res)
        // if(result.role !== 'admin')
        // return res.status(400).json({err: "Authentication is not valid."})
        
        const {id} = req.query

        await Comment.findByIdAndDelete(id)
        res.json({msg: "Success! Delete a comment."})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}