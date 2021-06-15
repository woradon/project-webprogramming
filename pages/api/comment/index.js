import connectDB from '../../../utils/connectDB'
import Comment from '../../../models/commentModel'
import auth from '../../../middleware/auth'

connectDB() 

export default async (req, res) => {
    switch(req.method){
        case "POST" :
            await createComment(req, res)
            break;
        case "GET" :
            await getComment(req, res)
            break;
    }
}

const createComment = async (req, res) => {
    try {
        const result = await auth(req, res)
        // if(!result.user) return res.status(400).json({err: "Please Login before comment."})
        const {text, productid } = req.body
        if(!text) return res.status(400).json({err: "Comment can not be left blank."})

        const newComment = new Comment({user: result.id, text, productid , name: result.name})

        await newComment.save()
        
        res.json({
            newComment
        })

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const getComment = async (req, res) => {
    try {        
        const comment = await Comment.find()

        res.json({
            comment
        })

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}