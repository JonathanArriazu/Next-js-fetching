import React, { useEffect } from 'react'
import fs from 'fs/promises';
import path from 'path';

const ProductDetailPage = (props) => {

    const { loadedProduct } = props;

    if(!loadedProduct) {
        return <p>Loading...</p>
    }

  return (
    <>
        <h1>{loadedProduct.title}</h1>
        <p>{loadedProduct.description}</p>
    </>
  )
}

async function getData() {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(jsonData);

    return data
}

export async function getStaticProps(context) {
    const { params } = context;
    const productId = params.id;

    const data = await getData();
    
    const product = data.products.find(product => product.id === productId);

    if(!product) {
        return {notFound: true} // if true, the page will return a 404 error whe fallback is true. If you put fallback false, it is not necesary to put this line
    }

    return {
        props: {
            loadedProduct: product
        }
    }
}

export async function getStaticPaths() {
    const data = await getData();

    const ids = data.products.map(product => product.id);
    const pathsWithParams = ids.map(id => ({ params: { id } }));

    return {
        paths: pathsWithParams,
        fallback: true // if true that will generate other paths that are not in the paths array
    }
}

export default ProductDetailPage