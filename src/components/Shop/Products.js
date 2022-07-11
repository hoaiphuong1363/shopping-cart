import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
    { id: 'p1', price: 6, title: 'Harry Porter', description: 'The first Book I ever wrote' },
    { id: 'p2', price: 7, title: 'Deep Work', description: 'The first Book I ever wrote' },
    { id: 'p3', price: 8, title: 'Homo Sapiens', description: 'The first Book I ever wrote' },
    { id: 'p4', price: 9, title: 'Homo Deus', description: 'The first Book I ever wrote' },
];

const Products = (props) => {
    return (
        <section className={classes.products}>
            <h2>Buy your favorite products</h2>
            <ul>
                {DUMMY_PRODUCTS.map((product) => {
                    return (
                        <ProductItem
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            description={product.description}
                        />
                    );
                })}
            </ul>
        </section>
    );
};

export default Products;
