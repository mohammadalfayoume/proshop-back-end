const express =require('express') //import express framework
const products =require('./data/products')

const app= express() //put all method inside a variable

app.get('/',testHandler)
app.get('/api/products', getProductsHandler)
app.get('/api/products/:id', getProductHandler)

// http://localhost:5000/
function testHandler(req,res) {
    res.send('API is running...')
}
// http://localhost:5000/api/products
function getProductsHandler(req,res) {
    res.json(products) //because the products are a JS array of objs, it's not actual json contents, the res.send() or res.json(), it is going to convert it to the json content type
}
// http://localhost:5000/api/products/:id
function getProductHandler(req,res) {
    const product= products.find(p=> p._id === req.params.id)
    res.json(product)
}


app.listen(5000, console.log('Server running on port 5000'))