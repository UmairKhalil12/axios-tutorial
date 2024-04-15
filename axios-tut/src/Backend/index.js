import express from 'express';
import { products } from './db.mjs';
import cors from 'cors';
import bodyParser from 'body-parser';

const port = 3001;
const app = express();
app.use(cors());

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server is listening to port ${port}`);
});

app.get('/api', (req, res) => {
    res.send(products);
});


app.post('/api', (req, res) => {
    const { name, detail, price } = req.body;
    const newProduct = {
        id: products.length + 1,
        name: name,
        detail: detail,
        price: price,
    };
    products.push(newProduct);
    res.send(products);
});


app.put('/api/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const productUpdateIndex = products.findIndex(product => product.id === id);
    console.log('product index put request', productUpdateIndex);

    if (productUpdateIndex === -1) {
        return res.status(404).json({
            'status': 'failed',
            'message': 'index of product not found'
        });
    }

    console.log('req.body', req.body)

    products[productUpdateIndex] = {
        name: name,
        detail: detail,
        price: price
    };

    res.json({ message: "Product updated successfully", product: products[productUpdateIndex] });
});

app.delete('/api/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log('id delete api', id);
    const productIndex = products.findIndex(product => product.id === id);
    console.log('product index', productIndex);

    if (productIndex === -1) {
        return res.status(404).json({
            'status': 'failed',
            'message': 'Product not found'
        });
    }

    products.splice(productIndex, 1);
    res.json({ message: "Product deleted successfully" });
});

app.get('/api/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log('id', id);
    
    const product = products.find(product => product.id === id);

    if (!product) {
        return res.status(404).json({
            'status': 'failed',
            'message': 'Product not found'
        });
    }

    res.json({ product });
});
