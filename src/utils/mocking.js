const { faker } = require('@faker-js/faker');

function generateMockProducts(count = 100) {
    const products = [];
    for (let i = 0; i < count; i++) {
        const product = {
            _id: faker.database.mongodbObjectId(),
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            thumbnail: faker.image.url(),
            code: faker.commerce.productMaterial(),
            stock: faker.string.numeric(2),
            status: true,
            category: faker.commerce.department()
        };
        products.push(product);
    }
    return products;
}

module.exports = { generateMockProducts };