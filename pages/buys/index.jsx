import React, { useEffect, useState } from 'react'
import useSwr from 'swr'

const LastSalePage = (props) => {

  const [sales, setSales] = useState(props.sales);

  const {data, error} = useSwr('https://nextjs-course-f159d-default-rtdb.firebaseio.com/sales.json', (url) => fetch(url).then(response => response.json()), { refreshInterval: 1000 })

    useEffect(() => {
        if(data) {
            const transformedSales = [];
            for (const key in data) {
            transformedSales.push({
                id: key,
                username: data[key].username,
                volume: data[key].volume
            });
            }
            setSales(transformedSales);
        }
    }, [data]);
  

  if (error) {
    return <p>Failed to load.</p>
  }

  if (!data) {
    return <p>Loading...</p>
  }

  if (!sales && !sales) {
    return <p>Loading...</p>
  }


  return (
    <ul>
      {sales.map(sale => (
        <li key={sale.id}>{sale.username} - ${sale.volume}</li>
      ))}
    </ul>
  )
}

export async function getStaticProps() {
  const response = await fetch('https://nextjs-course-f159d-default-rtdb.firebaseio.com/sales.json')
  const data = await response.json()

  const transformedSales = [];
  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume
    });
  }

  return {
    props: {
      sales: transformedSales
    },
    //revalidate: 10
  }
}

export default LastSalePage