import Head from 'next/head'
import Slide from 'react-reveal/Slide'
import React from 'react'
import {Parallax} from 'react-parallax'
import Fade from 'react-reveal/Fade'
import {getData} from '../utils/fetchData'
import {useState} from 'react'
import ProductNew from '../components/product/ProductNew'
import ProductShow from '../components/product/ProductShow'
import Slider from "react-slick"
import Link from 'next/link'
import ReactPlayer from 'react-player'


const Home = (props) => {
  const [products, setProducts] = useState(props.products)
  const [productsHot] = useState(props.productsHot)

  const NextArrow = ({onClick}) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <i class="fal fa-chevron-right fal-next" id="right"></i>
      </div>
    )
  }
  
  const PrevArrow = ({onClick}) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <i class="fal fa-chevron-left fal-prev" id="left"></i>
      </div>
    )
  }

  const carouselSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow/>,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        }
      },{
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        }
      }
      
    ]
  }

  const settingsBand = {
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1080,
        settings:{
            autoplay: true,
            autoplaySpeed: 2000,
            infinite: true,
            arrows: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
        },
        breakpoint: 800,
        settings:{
            autoplay: true,
            autoplaySpeed: 2000,
            infinite: true,
            arrows: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 2,
        }
        
      }
    ]
  }

  return(
    <div>
      <Head>
        <title>Home page</title>
      </Head>
      

      <div className="">
        <div className="position-absolute"
        style={{color: 'white', width: '100%'}}>
          <Fade right>
            <h2 className="banner-font" >TAKE FLIGHT</h2>
          </Fade>
        </div>
        
        <img src="takebaner.jpg" style={{width:'100%',height:'700px'}}/>        
      </div>
      <div className="content-area"> 
      </div>

      <div className="container" style={{marginTop: '100px'}}>

      <Fade bottom>
        <h2 className="text-center mb-5">POPULAR RIGHT NOW</h2>
      </Fade>
      <Fade bottom>
        <div className="products">
          <Slider {...carouselSettings}>
            {
                productsHot.length === 0
                ? <h2>No Products</h2>
                : productsHot.map(product => (
                  <div>
                    <ProductShow key={product._id} product={product} />
                  </div>
                ))
              }  
          </Slider>       
        </div>
      </Fade>
      
      <Fade>
        <div className="" style={{cursor: 'pointer'}}>
          <Link href="/shop?search=all&category=60c783850e78b50e48a99739">
            <img src="https://i8.amplience.net/i/jpl/nwbl-016-jd-2002-digital-bannersite-homepagemiddlebanner-general-92bbeb64734bd4519d485f6f7a21b962?qlt=80&fmt=webp" 
            style={{width: '100%', height: '600px', marginTop: '80px', marginBottom: '80px'}}/>
          </Link>     
        </div>
      </Fade>
      
      
      <div className="row">
        <Fade right>
          <div className="col-6 mb-3">
            <h2 className="">LATEST DROPS</h2>
          </div>
        </Fade>
        
        
        <Fade right>
          <div className="col-6">
                <h5 className="text-end "
                style={{paddingTop: '8px'}}>
                  <Link href="/shop">
                    <u style={{cursor: 'pointer' }}>view all</u>
                  </Link>                  
                </h5>     
          </div>
        </Fade>
              
      </div>
      
      
      <div className="products">
        <Slider {...carouselSettings}>
          {
            products.length === 0
            ? <h2>No Products</h2>
            : products.map(product => (
              <div>
                <ProductNew key={product._id} product={product} />
              </div>
            ))
          }
        </Slider>
      </div>
      
      <div style={{marginTop: '100px', cursor: 'pointer'}}> 
          <Slider {...settingsBand}>
              <div >
                <Link href="/shop?search=all&category=60b6a3f03ccc2441649bfe57">
                  <img src="https://res.cloudinary.com/dhr9ac0xa/image/upload/v1623317265/band/adidas_logo_icon_169639_vqmw2n.png" 
                  className="slick-img"/>
                </Link>          
              </div>
              <div >
                <Link href="/shop?search=all&category=60b6a1503ccc2441649bfe56">
                  <img src="https://res.cloudinary.com/dhr9ac0xa/image/upload/v1623317266/band/nike_swoosh_logo_black_d4qfe5.png" 
                  className="slick-img"/>
                </Link>                
              </div>
              <div >
                <Link href="/shop?search=all&category=60ba0d23a80d083cb05ed464">
                  <img src="https://res.cloudinary.com/dhr9ac0xa/image/upload/v1623317266/band/CONVERSE_WEB_LOGO-01_eq5yah.png" 
                  className="slick-img"/>
                </Link>   
              </div>
              <div >
                <Link href="/shop?search=all&category=60b7510e3ccc2441649bfe5e">
                  <img src="https://res.cloudinary.com/dhr9ac0xa/image/upload/v1623317266/band/f4ae616da5b1a5bbe5712394d76d4782_zujlnt.jpg" 
                  className="slick-img"/>
                </Link>    
              </div>
              <div >
                <Link href="/shop?search=all&category=60c7563d0e78b50e48a99733">
                  <img src="https://res.cloudinary.com/dhr9ac0xa/image/upload/v1623317266/band/1979_PUMA_no1_logo_jxtcdk.jpg" 
                  className="slick-img"/>
                </Link>
                
              </div>
              <div >
                <Link href="/shop?search=all&category=60c783850e78b50e48a99739">
                  <img src="https://res.cloudinary.com/dhr9ac0xa/image/upload/v1623317266/band/New-Balance-Logo8_iixc3l.jpg" 
                  className="slick-img"/>
                </Link>
                
              </div>
              <div >
                <img src="https://res.cloudinary.com/dhr9ac0xa/image/upload/v1623317267/band/Reebok-Logo-PNG-Photos_icmqne.png" 
              className="slick-img"/>
              </div>
          </Slider>
      </div>

      </div>
      
      

    </div>
  )
}

export async function getServerSideProps({query}) {
    const page = query.page || 1
    const category = query.category || 'all'
    const sort = query.sort || '-createdAt'
    const sorthot = query.sort || '-sold'
    const search = query.search || 'all'

    const res = await getData(
      `product?limit=${page*9}&category=${category}&sort=${sort}&title=${search}`
      )

    const hot = await getData(
      `product?limit=${page*9}&category=${category}&sort=${sorthot}&title=${search}`
      )
    
  return {
    props: {
        products: res.products,
        result: res.result,
        productsHot: hot.products
    }, 
  }
}


export default Home