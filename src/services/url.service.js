import { Url } from "../models/url.model.js";

let urls = new Set();

export const saveUrl = async(url) => {
    try {
        const newUrl = new Url({
            _id: url
        })
        newUrl.save()
        urls.add(url)
        return newUrl._id        
    } catch (error) {
        console.log(error);
    }
}

export const getAllUrls = async () => {
    try {
        const result = await Url.find() 
        return result
    } catch (error) {
        
    }
}

export const existUrl = async(url) => {
    if(urls.size === 0 ){
        try {
            const result = await getAllUrls()
            for (let i = 0; i < result.length; i++) {
                urls.add(result[i]._id)
            }
        } catch (error) {console.log(error);}
    } 
    return urls.has(url)
}