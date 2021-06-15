import Head from 'next/head'
import {useState, useContext, useEffect} from 'react'
import {DataContext} from '../../store/GlobalState'
import {imageUpload} from '../../utils/imageUpload'
import {postData, getData, putData} from '../../utils/fetchData'
import {useRouter} from 'next/router'

const ProductsManager = () => {
    const initialState = {
        title: '',
        price: 0,
        inStock: 0,
        description: '',
        content: '',
        category: '',
    }

    const [product, setProduct] = useState(initialState)
    const {title, price, inStock, description, content, category} = product

    const [images, setImages] = useState([])
    
    const {state, dispatch} = useContext(DataContext)
    const {categories, auth} = state

    const router = useRouter()
    const {id} = router.query
    const [onEdit, setOnEdit] = useState(false)

    useEffect(() => {
        if (id) {
            setOnEdit(true)
            getData(`product/${id}`).then(res => {
                setProduct(res.product)
                setImages(res.product.images)
            })
        } else {
            setOnEdit(false)
            setProduct(initialState)
            setImages([])
        }
    },[id])

    const handleChangeInput = e => {
        const {name, value} = e.target
        setProduct({...product, [name]:value})
        dispatch({type: 'NOTIFY', payload: {}})
    }
    
    const handleUpdateInput = e => {
        dispatch({type: 'NOTIFY', payload: {}})
        let newImages = []
        let num = 0
        let err = ''
        const files = [...e.target.files]
        
        if(files.length === 0) 
        return dispatch({type: 'NOTIFY', payload: {error: 'Files does not exist.'}})

        files.forEach(file => {
            if(file.size > 1024 * 1024)
            return err = 'The largest image size is 1mb.'

            if(file.type !== "image/jpeg" && file.type !== "image/png") 
            return err = 'Image format is incorrect.'

            num += 1
            if(num <= 10) newImages.push(file)
            return newImages;
        })
        if(err) dispatch({type: 'NOTIFY', payload: {error: err}})

        const imgCount = images.length 
        if(imgCount + newImages.length > 10)
        return dispatch({type: 'NOTIFY', payload: {error: 'Select up to 10 images.'}})
        setImages([...images, ...newImages])
    }

    const deleteImage = index => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(auth.user.role !== 'admin')
        return dispatch({type: 'NOTIFY', payload: {error: 'Authentication is not valid.'}})

        if(!title || !price || !inStock || category === 'all' || images.length === 0)
        return dispatch({type: 'NOTIFY', payload: {error: 'Please add all the fields.'}})

        dispatch({type: 'NOTIFY', payload: {loading: true}})
        let media = []
        const imgNewURL = images.filter(img => !img.url)
        const imgOldURL = images.filter(img => img.url)

        if(imgNewURL.length > 0) media = await imageUpload(imgNewURL)

        let res;
        if (onEdit) {
            res = await putData(`product/${id}`, {...product, images: [...imgOldURL, ...media]}, auth.token)
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}}) 
        } else {
            res = await postData('product', {...product, images: [...imgOldURL, ...media]}, auth.token)
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}}) 
        }


        return dispatch({type: 'NOTIFY', payload: {success: res.msg}}), router.push('/shop') 
        
    } 

    if(auth.user && auth.user.role !== 'admin') return router.back();
    return(
        <div className="container" style={{marginTop: '30px'}}>
            <Head className="products_manager">
                <title>Product Manager</title>
            </Head>
            <form className="row" onSubmit={handleSubmit}>
                <div className="col-lg-6">
                    
                    <label className="mt-2">Title</label>
                    <input type="text" name="title" value={title}
                    placeholder="" className="d-block my-1 w-100 p-2 "
                    onChange={handleChangeInput}/>

                    <div className="row mt-3">
                        <div className="col-sm-6">
                            <label htmlFor="price">Price</label>
                            <input type="number" name="price" value={price}
                            placeholder="" className="d-block w-100 my-1 p-2"
                            onChange={handleChangeInput}/>
                        </div>

                        <div className="col-sm-6">
                            <label htmlFor="inStock">InStock</label>
                            <input type="number" name="inStock" value={inStock}
                            placeholder="" className="d-block w-100 my-1 p-2"
                            onChange={handleChangeInput}/>
                        </div>
                    </div>

                    <textarea name="description" id="description" className="form-control"
                    style={{height: '100px'}} value={description}
                    placeholder="Description" onChange={handleChangeInput}
                    className="d-block my-4 w-100 p-2"/>

                    <textarea name="content" id="content" 
                    style={{height: '150px'}} value={content}
                    placeholder="Content" onChange={handleChangeInput}
                    className="d-block my-4 w-100 p-2"/>

                    <div className="input-group-prepend px-0 my-2 ">
                        <label>Category</label>
                        <select name="category" id="category" value={category}
                        onChange={handleChangeInput} className="custom-select text-capitalize w-100 my-2 p-2">
                            <option value="all">All Product</option>
                            {
                                categories.map(item => (
                                    <option key={item._id} value={item._id}>
                                        {item.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    

                    <button type="submit" className="col-3 btn btn-dark mb-3 px-4 " >
                        { onEdit ? 'Update' : 'Create'}
                    </button>
                    
                </div>
                <div className="col-lg-6 my-4">
                    <div className="input-group mb-3">

                        <div className="input-group mb-3">
                            <input type="file" className="form-control  " 
                            onChange={handleUpdateInput} multiple accept="image/*"/>
                        </div>
                            
                        <div className="row img-up mx-0">
                            {
                                images.map((img, index) => (
                                    <div key={index} className="file_img my-2">
                                        <img src={img.url ? img.url : URL.createObjectURL(img)}
                                        alt="" className="img-thumbnail rounded" style={{objectFit: 'scale-down'}}/>
                                        <span onClick={() => deleteImage(index)}>X</span>
                                    </div>
                                ))
                            }
                        </div>
                            
                    </div>
                </div>
                
            </form>

        </div>
    )
}

export default ProductsManager