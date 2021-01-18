import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getFromApi } from "./requestService"

export const useBrands = (brandId) => {
    const [brand, setBrand] = useState()
    useEffect(() => {
        getFromApi('/brands/' + (brandId?brandId:'')).then(data=>setBrand(data))
    }, [brandId])
return [brand,setBrand]
}
export const useProducts = (productId) => {
    const [product, setProduct] = useState()
    useEffect(() => {
        getFromApi('/products/' + (productId?productId:'')).then(data=>setProduct(data))
    }, [productId])
return [product,setProduct]
}
export const useCart=()=>{
    return useSelector(state=>state.cart)
}