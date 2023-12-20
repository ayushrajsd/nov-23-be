import React, { useState, useEffect } from 'react';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ProductList from '../components/ProductList';
import Categories from '../components/Categories';
import basicOps from '../utility/basicOps';
import { usePaginationContext } from '../contexts/PaginationContext';
import axios from 'axios';
import URL from '../../urlConfig'

function Home() {
    // preserver -> pagination
    /***single source of truth for all the products***/
    const [products, setProducts] = useState([]);
    /************ all the categories -> a product**********/
    const [categories, setCategories] = useState([]);
    /**********Action***********/
    /*********************** state ->term with which you want to filter the product list*****************************/
    const [searchTerm, setSearchTerm] = useState("");
    /**************************sort : 0 : unsorted , 1: incresing order , -1 : decreasing order ************************************/
    const [sortDir, setsortDir] = useState(0);
    /**************************** currcategory : category group you result **********************************/
    const [currCategory, setCurrCategory] = useState("All categories");
    // page num and page size
    const { pageSize, pageNum,
        setPageNum,
        setPageSize } = usePaginationContext();
    /****************get all the products*********************/
    useEffect(() => {
        (async function () {
            // const resp = await fetch(`https://fakestoreapi.com/products`)
            // console.log(resp);
            // const anotherResp = await fetch("/api/product");
            
            // const productData = await resp.json();
            const productData = await axios.get(URL.GET_PRODUCTS_URL);
            const productArr = productData.data.data;
            const productList = productArr.map((product) => {
                return {
                    id: product._id,
                    title: product.name,
                    image: product.images[0],
                    ...product
                }
            })
            console.log("products",productData);
            setProducts(productList);

        })()
    }, [])

    /**************getting all the categroies ********************/
    useEffect(() => {
        (async function () {
            // const resp = await fetch(`https://fakestoreapi.com/products/categories`)
            // const categoriesData = await resp.json();
            const categoriesData = await axios.get(URL.GET_CATEGORIES);
            console.log("categories",categoriesData);
            setCategories(categoriesData.data.data);
        })()
    }, [])
    const object = basicOps(products, searchTerm, sortDir, currCategory, pageNum, pageSize);
    const filteredSortedgroupByArr = object.filteredSortedgroupByArr;
    const totalPages = object.totalPages;
    return (
        <>
            {/* header */}
            <header className="nav_wrapper">
                <div className="search_sortWrapper">
                    <input
                        className='search_input'
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                            setPageNum(1);
                        }} />
                    <div className="icons_container">
                        <ArrowCircleUpIcon
                            style={{ color: "white" }}
                            fontSize="large"
                            onClick={() => {
                                setsortDir(1)
                                setPageNum(1)
                            }}
                        ></ArrowCircleUpIcon>
                        <ArrowCircleDownIcon
                            fontSize="large"
                            style={{ color: "white" }}
                            onClick={() => {
                                setsortDir(-1)
                                setPageNum(1)
                            }}
                        ></ArrowCircleDownIcon>
                    </div>
                </div>

                <div className="categories_wrapper">
                    <Categories categories={categories}
                        setCurrCategory={setCurrCategory}

                    ></Categories>
                </div>

            </header>

            {/* main area  */}
            <main className="product_wrapper">
                {/* products will be there */}
                <ProductList productList={filteredSortedgroupByArr}> ̰</ProductList>
            </main>
            {/* pagination */}
            <div className="pagination">
                <button
                    onClick={() => {
                        if (pageNum == 1)
                            return
                        setPageNum((pageNum) => pageNum - 1)
                    }}

                    disabled={pageNum == 1 ? true : false}
                >
                    <KeyboardArrowLeftIcon fontSize='large'></KeyboardArrowLeftIcon>
                </button>
                <div className="pagenum">
                    {pageNum}
                </div>
                <button
                    onClick={() => {
                        if (pageNum == totalPages)
                            return
                        setPageNum((pageNum) => pageNum + 1)
                    }}
                    disabled={pageNum == totalPages ? true : false}


                >
                    <ChevronRightIcon fontSize='large'

                    ></ChevronRightIcon>
                </button>
            </div>
        </>

    )
}

export default Home;


/***
 * 1. Steps/ 
 *  - INtial Data 
 *  a. Searching
 *  b. Sorting
 *  c. Categorization
 *  d. Pagination
 *  e. Render the Results
 * 
 * 2. Data 
 *      1. Products
 *      2. Categories
 * 
 * 
 * **/

