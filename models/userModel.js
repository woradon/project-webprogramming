import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        uniqie: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    root: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/dhr9ac0xa/image/upload/v1619505754/585e4bf3cb11b227491c339a_bmxd2w.png'
    }
},{
    timestamps: true
})

let Dataset = mongoose.models.user || mongoose.model('user',userSchema)
export default Dataset