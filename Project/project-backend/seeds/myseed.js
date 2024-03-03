/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 * 
 */

const users = [
    {
        username: 'admin',
        password: 'c7ad44cbad762a5da0a452f9e854fdc1e0e7a52a38015f23f3eab1d80b931dd472634dfac71cd34ebc35d16ab7fb8a90c81f975113d6c7538dc69dd8de9077ec',
    },
    {
        username: 'lathanhtrong',
        password: 'b4677847b83372b5f88788deea0566179af62242eac98be9e83794508fee58f56e1ec842524b5f7d02240ffc5b3d77ca7ff2171a7c822105718b1c4601c314a6'
    },
    {
        username: 'leminhman',
        password: '9c80f25c019f5930b82f57009457ba082a39c2ee5c0ccc3fe4754243882e7cc3f9874a52789ed49c756da8e3c8332ba4b88841cdbf1ed44f88d047a0b60d9a91'
    },
];

const brands = [
    {
        bname: 'Nike',
    },
    {
        bname: 'Adidas',
    },
    {
        bname: 'Converse',
    },
];

const products = [
    {
        pname: 'Air Force 1',
        bid: 1,
        description: 'Giày Nike Air Force 1 Low Waterproof Grey là một đôi giày sneaker thấp cổ dành cho nam và nữ, được ra mắt vào năm 2023. Đôi giày này được thiết kế theo phong cách cổ điển của dòng Air Force 1, nhưng có thêm lớp chống thấm nước ở phần upper, giúp người sử dụng có thể thoải mái đi giày trong mọi điều kiện thời tiết.',
        price: 5000000,
        pimage: '/images/AF1.jpg',
    },
    {
        pname: 'Adidas Yeezy Boost 700 Wave Runner',
        bid: 2,
        description: 'Giày Adidas Yeezy Boost 700 Wave Runner là một đôi giày thể thao được thiết kế bởi Kanye West, nhà thiết kế thời trang và rapper người Mỹ. Đôi giày được ra mắt vào năm 2017 và nhanh chóng trở thành một trong những đôi giày Yeezy được yêu thích nhất mọi thời đại.',
        price: 12000000,
        pimage: '/images/Adidas-Yeezy.jpg',
    },
    {
        pname: 'Chuck 70 High Court Green',
        bid: 3,
        description: 'Converse Chuck 70 High Court Green là một phiên bản của dòng giày Converse Chuck 70 cao cổ với màu sắc chủ đạo là màu xanh lá cây, tạo nên vẻ ngoại hình tươi mới và phong cách.',
        price: 4000000,
        pimage: '/images/Chuck-70.jpg',
    },
    {
        pname: 'Adidas Run Falcon',
        bid: 2,
        description: 'Giày Adidas Run Falcon là một đôi giày thể thao được thiết kế cho những người chạy bộ, với thiết kế đơn giản nhưng vẫn đảm bảo sự thoải mái và chắc chắn cho người sử dụng.',
        price: 1500000,
        pimage: '/images/Run-Falcon.jpg',
    },
    {
        pname: 'Nike Zoom Fly 5',
        bid: 1,
        description: 'Giao diện của Nike Zoom Fly 5 được thiết kế theo phong cách đơn giản, với màu sắc chủ đạo là màu trắng, tạo nên vẻ ngoại hình tươi mới và phong cách.',
        price: 3000000,
        pimage: '/images/Zoom-Fly-5.jpg',
    },
    {
        pname: 'Converse Fear of God Essentials',
        bid: 3,
        description: 'Converse Fear of God Essentials là một đôi giày đa năng, có thể phối hợp với nhiều phong cách thời trang khác nhau. Nó phù hợp cho cả nam và nữ, và có thể được mang trong nhiều dịp khác nhau, từ đi học, đi làm đến đi chơi.',
        price: 5000000,
        pimage: '/images/Fear-of-God.jpg',
    },
    {
        pname: 'Adidas Adistar',
        bid: 2,
        description: 'Dòng giày Adidas Adistar được đánh giá cao về sự thoải mái và hiệu quả. Chúng là một lựa chọn tuyệt vời cho những người chạy bộ đang tìm kiếm một đôi giày mang lại sự hỗ trợ và bảo vệ tốt.',
        price: 2000000,
        pimage: '/images/Adistar.jpg',
    },
];

exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('user').del()
    await knex('user').insert(users).then(() => {
        console.log('User table seeded');
    }).catch((err) => {
        console.log(err);
    });

    await knex('brand').del()
    await knex('brand').insert(brands).then(() => {
        console.log('Brand table seeded');
    }).catch((err) => {
        console.log(err);
    });

    await knex('product').del()
    await knex('product').insert(products).then(() => {
        console.log('Product table seeded');
    }).catch((err) => {
        console.log(err);
    });
};