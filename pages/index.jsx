import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

const HomePage = (props) => {
  const { products } = props;

  return (
    <>
    <div>
      <ul>
        {products.map(product => (
          <li key={product.id}><Link href={`/products/${product.id}`} >{product.title}</Link></li>
        ))}
      </ul>
    </div>
    <div>
      <p><Link href="/users/1">User Profile</Link></p>
      <p><Link href="/sales">Last Sales</Link></p>
      <p><Link href="/buys">Last Buys</Link></p>
      
    </div>
    </>
  );
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  if(!data) {
    return {
      redirect: {
        destination: '/no-data'
      }
    }
  }

  if (data.products.length === 0) {
    return {notFound: true}
  }

  return {
    props: {
      products: data.products
    },
    revalidate: 10, // seconds - 10 seconds after the last request, the page will be regenerated (if there are changes). This work in production mode only.
    notFound: false // if true, the page will return a 404 error
  };
}

export default HomePage;
