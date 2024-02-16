import { MongoClient } from 'mongodb';
const url = 'mongodb://mongo:27017/';
const client = new MongoClient(url);

// Connection
async function main() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        Tests(client);
    } catch (e) {
        console.error(e);
    // } finally {
    //     await client.close();
    }
}

main().catch(console.error);

// Business Class
class OrderService {
    constructor(client) {
      this.client = client;
      this.db = this.client.db("pizzas_orders_db");
      this.orders = this.db.collection("orders");
    }
  
    async getOrders() {
      return await this.orders.find({}).toArray();
    }
  
    async getOrdersByPizza(pizzaType) {
      return await this.orders.find({ name: pizzaType }).toArray();
    }
  
    async getOrdersBySize(size) {
      return await this.orders.find({ size: size }).toArray();
    }
  
    async getOrdersByCriteria(criteria) {
      return await this.orders.find(criteria).toArray();
    }
  }
  

// Testing Requests
async function Tests(client) {
    pizzas = new OrderService(client);

    const allOrders = await pizzas.getOrders();
    console.log("Orders: ", allOrders);

    const pepperoniOrders = await pizzas.getOrdersByPizza("Pepperoni");
    console.log("Orders for Pepperoni: ", pepperoniOrders);

    const mediumOrders = await pizzas.getOrdersBySize("medium");
    console.log("Orders for medium: ", mediumOrders);

    const criteriaOrders = await pizzas.getOrdersByCriteria({size: "medium", quantity: 10});
    console.log("Orders for 10 medium pizzas: ", criteriaOrders);
}