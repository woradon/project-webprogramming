import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    text: {
        type: String,
        require: true
    },
    productid: {
        type: mongoose.Types.ObjectId,
        ref: 'product'
    },
    name: {
        type: String,
        require: true
    }
},{
    timestamps: true
})

let Dataset = mongoose.models.comment || mongoose.model('comment',CommentSchema)
export default Dataset