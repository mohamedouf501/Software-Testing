const db = require("./db");

const sum = (a, b) => a + b;

const greeting = (name) => `Hello ${name} !`;

const isEven = (number) => (number % 2 == 0 ? true : false);

const Anmimls = ["cat", "dog", "fish"];

const getOrderById = (id) => {
  if (!id) {
    throw new Error(" id   is not defined");
  }
  return {
    id: 1,
    price: 10,
    date: 2022,
  };
};

const getOrders = async () => {
  return [
    {
      id: 1,
      price: 10,
    },
    {
      id: 2,
      price: 10,
    },
  ];
};

const applyDiscount = (orderId) => {
  const order = db.getOrder(orderId);
  if (order.price >= 10) {
    order.price -= order.price * 0.1;
  }

  return order;
};

// const createOrder = async (userId, products) => {
//   if (!userId) {
//     throw new Error("userId not found");
//   }
//   let totalPrice = 0;
//   products.forEach((product) => {
//     totalPrice += product.price;
//   });


//   await db.createOrder((userId, products)
//     const user = await db.getUser(userId)
//   email.sendEmail(user.email, totalPrice)
//   return `order created successfully with totalPrice : ${totalPrice} and products ${products} `
// };

module.exports = {
  sum,
  greeting,
  isEven,
  Anmimls,
  getOrderById,
  getOrders,
  applyDiscount,
  // createOrder
};
