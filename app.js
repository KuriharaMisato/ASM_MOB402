
const express = require('express');
const path = require('path');
const app = express();
const port = 3000
const fs = require('fs')
app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname) + '/public'))


let arrUser = [
    { id: 1, name: 'Đức', user: 'wibu', password: '0123456789', img: 'https://img.wattpad.com/c26afdb7f1dae6a158dde63adb1e78167189d3f3/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f446a6336657069574a5a6a6142513d3d2d3632363435353634372e313535303935303939663337613037383736383437383834313635392e6a7067?s=fit&w=720&h=720' },
    { id: 2, name: 'Hùng', user: 'hungdicodedao', password: '0123456789', img: 'https://bizweb.dktcdn.net/100/303/962/files/87126502-2509242206005371-2073523065622364160-n-f697e400-e8b2-4bb1-9698-d00b50b2d9c3.jpg?v=1627804121650' },
    { id: 3, name: 'Khánh', user: 'zukhennnnnnnnnnnnnnn', password: '0123456789', img: 'http://genk.mediacdn.vn/k:thumb_w/640/2015/screen-shot-2015-07-30-at-2-31-57-pm-1438334096188/cau-chuyen-ve-nguoi-tao-ra-chu-ech-xanh-than-thanh.png' },
]

let arrProduct = [
    { productId: 1, productName: 'Áo phao', productPrice: 9999999, avatar: 'https://vitimex.com.vn/hinhanh/sanpham/ao-phao-long-vu-akn0123.jpg', productColor: 'Xám', productType: "Electronics", customerId: 101, customerName: "Vu Viet Khanh" },
    { productId: 2, productName: 'Quần kahi', productPrice: 99999, avatar: 'https://www.akmen.vn/images/2017/01/quan-kaki-xanh-bien-qk163-3555-p.jpg', productColor: 'Xám', productType: "Clothing", customerId: 102, customerName: "Vu Viet Khanh" },
    { productId: 3, productName: 'Áo Jean', productPrice: 99999999, avatar: 'https://cf.shopee.vn/file/3bf98a971a93bda6053cac1c572247f9', productColor: 'Xám', productType: "Books", customerId: 103, customerName: "Vu Viet Khanh" },
    { productId: 4, productName: 'Quần âu', productPrice: 9999999999, avatar: 'https://360boutique.vn/wp-content/uploads/2021/04/QACTK203-1.jpg', productColor: 'Xám', productType: "Appliances", customerId: 104, customerName: "Vu Viet Khanh" },
    { productId: 5, productName: 'Áo khoác', productPrice: 9999, avatar: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/415/697/products/m0w2iuvv-1-1hxj-hinh-mat-truoc-0as.jpg', productColor: 'Xám', productType: "Toys", customerId: 105, customerName: "Vu Viet Khanh" },
]



app.get(['/', '/login'], function (req, res) {
    res.render('login', { title: "Helica Management", check: false })
})


app.get('/register', function (req, res) {
    res.render('register', { title: "Helica | Register" })
})
app.get('/index', function (req, res) {
    res.render('index', { title: "Trang chủ", data: arrProduct });
});
app.get('/list', function (req, res) {
    console.log(JSON.stringify(arrUser));
    res.render('list', { title: "Danh sách người dùng", data: arrUser });

})

app.post('/register', function (req, res) {
    const { email, password, fullName } = req.body
    const tempData = { email, password, fullName }
    fs.appendFile('account.txt', JSON.stringify(tempData) + '\n', function (err) {
        if (err) throw err;
        res.redirect('/login')
    });

})
app.post('/login', function (req, res, next) {
    const { usr, pwd } = req.body;
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>LOGIN: " + usr, pwd);

    fs.readFile('account.txt', function (err, data) {
        const users = data.toString().split('\n').filter(Boolean).map(JSON.parse);
        const user = users.find(u => u.email === usr && u.password === pwd);
        if (user) {
            res.redirect('/index');
        } else {
            res.render('login', { title: "Helica Management", check: true })

        }
    });

})

app.listen(port, (err) => {
    console.log(`Server is running at http://localhost:${port}`);
})




