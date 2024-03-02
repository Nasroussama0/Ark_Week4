const express = require('express');
const app = express();
const port = 3000;

let products = [
    { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
    { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
    { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
    { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
    { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
  ];

app.get('/products', (req, res) => {
  res.send(products);
});
app.get('/products/:id',(req,res) => {
    for (var i=0;i<products.length;i++){
        if(products[i].id == req.params.id){
            var result = products[i];
        }
    }
    res.send(result)
});
app.get('/products/search/:max/:min',(req,res) => {
    const q = req.params;
    var table = [];
    for(var i=0;i<products.length;i++){
        if(q.max>products[i].price && q.min<products[i].price){
            table.push(products[i])
        }
    }
    res.send(table);
});
app.post('/products', (req, res) => {
    var x = { id: 90, name: 'iPhone 20 Pro', price: 1111111.99 };
    res.send(x);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


