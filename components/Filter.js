import React, {useState, useEffect} from 'react'
import filterSearch from '../utils/filterSearch'
import {getData} from '../utils/fetchData'
import {useRouter} from 'next/router'

const Filter = ({state}) => {
    const [title, setTitle] = useState('')
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [category, setCategory] = useState('')

    const {categories} = state 
    const router = useRouter()

    const handleCategory = (e) => {
        setCategory(e.target.value)
        filterSearch({router, category: e.target.value})
    }

    const handleSort = (e) => {
        setSort(e.target.value)
        filterSearch({router, sort: e.target.value})
    }

    useEffect(() => {
        filterSearch({router, search: search ? search.toLowerCase() : 'all'})
    },[search])

    return (
        <div className="input-group" style={{marginTop: '30px', marginBottom: '20px'}}>

            <div className="input-group-prepend col-lg-2 col-md-3 col-sm col px-0 mt-2 ps-2" id="first">
                <select className="form-select text-capitalize shadow-none" 
                value={category} onChange={handleCategory} >
                    <option value="" disabled selected>Category</option>
                    <option value="all">All Products</option>
                    {
                        categories.map(item => (
                            <option key={item._id} value={item._id}>{item.name}</option>
                        ))
                    }
                </select>
            </div>
            
            <div className="mt-2 col-lg-8 col-md-6 col-sm-12 col-12 px-0 ps-2" id="second">
                <form autoComplete="off">
                <input type="text" className="form-control shadow-none" list="title_product"
                placeholder="Search"
                value={search} onChange={e => setSearch(e.target.value)}/>
                </form>
            </div>           

            <div className="input-group-prepend col-lg-2 col-md-3 col-sm col px-0 mt-2 ps-2" id="third">
                <select className="form-select text-capitalize shadow-none"
                value={sort} onChange={handleSort}>
                    <option value="" disabled selected>Sort by</option>
                    <option value="-createdAt">Newest</option>
                    <option value="-oldest">Oldest</option>
                    <option value="-sold">Best sales</option>
                    <option value="-price">Price ( Hight-Low )</option>
                    <option value="price">Price ( Low-Hight )</option>

                </select>
            </div>

        </div>
    )
}

export default Filter