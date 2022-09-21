import React from "react";

export const api = "http://localhost:3003/Users";

export const crud = () => {
    const customFetch = async (url, options) => {
        const defaultMethod = "GET";
        const defaultHeaders = {
            "Content-Type": "application/json",
            Accept: "application/json"
        }

        // used to control ongoing fetch requests
        const controller = new AbortController;
        options.signal = controller.signal;

        // assign methods, header and body
        options.method = options.method || defaultMethod;
        options.headers = options.headers? 
        {...defaultHeaders, ...options.headers}:
        defaultHeaders;
        options.body = JSON.stringify(options.body) || false;

        if(!options.body) delete options.body;

        setTimeout(() => {
            controller.abort()
        }, 3000);

        try{
            // check assertion
            const res = await fetch(url, options);
            return await res.json()
        }catch (err){
            return err
        }
    }

    const get = (url ) => customFetch(url, {});

    const add = (url, options) => {
        options.method = "POST";
        return customFetch(url, options)
    }

    return {get, add};
}