const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/categories/:categoryname/products/:productname', async(req, res) => {
    let data = JSON.stringify({
            "companyName": "ManiMart",
            "clientID": "da63106f-cad0-40ca-98c1-525958b1bc66",
            "clientSecret": "bChtNGQKCgaQzGQr",
            "ownerName": "Mohammad Sufiyaan Khan",
            "ownerEmail": "ksufiyaan841@gmail.com",
            "rollNo": "2111CS020605"
      }); 
    const auther_token = await axios({
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://20.244.56.144/test/auth',
        headers: { 
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIzODgwMjg5LCJpYXQiOjE3MjM4Nzk5ODksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImRhNjMxMDZmLWNhZDAtNDBjYS05OGMxLTUyNTk1OGIxYmM2NiIsInN1YiI6ImtzdWZpeWFhbjg0MUBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJNYW5pTWFydCIsImNsaWVudElEIjoiZGE2MzEwNmYtY2FkMC00MGNhLTk4YzEtNTI1OTU4YjFiYzY2IiwiY2xpZW50U2VjcmV0IjoiYkNodE5HUUtDZ2FRekdRciIsIm93bmVyTmFtZSI6Ik1vaGFtbWFkIFN1Zml5YWFuIEtoYW4iLCJvd25lckVtYWlsIjoia3N1Zml5YWFuODQxQGdtYWlsLmNvbSIsInJvbGxObyI6IjIxMTFDUzAyMDYwNSJ9.oyaiKLQLGV5-avF0f9Wod4xmqIuuhikPr77mhEbAlcU'
        },
        data : data
    })
    const AutherizationKey = 'Bearer ' + auther_token.data.access_token;
    const category_name = req.params.categoryname;
    const product_name  = req.params.productname;
    const getUrl = 'http://20.244.56.144/test/companies/' + category_name +'/categories/' + product_name + '/products?top=10&minPrice=1&maxPrice=10000'
    const ServerResponce = await axios({
        method:'get',
        maxBodyLength: Infinity,
        url: getUrl,
        headers: { 
          Authorization : AutherizationKey
        }
    })
    console.log(ServerResponce.data)
    res.json(ServerResponce.data);
})


app.listen(port, () => {
    console.log('App listening on port 3000!');
});