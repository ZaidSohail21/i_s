// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();


// //Creating a sample products for demo user
// async function main() {
//     const DemoUserId="clh5lnu80000v0b60f4f4k3r3"; // Replace with your actual user ID
//     data : Array.from({length:25}).map((_,i)=>({  
//         userId: DemoUserId,
//         name: `Product ${i+1}`,
//         sku: `SKU-${i+1}`,
//         price: 10.99 + i,
//         quantity: 10 + i,
//         lowStockAt: 5 + i,
//         createdAt: new Date(Date.now() - i * 86400000), // Spread createdAt over past days
//     }));
//     console.log("Seeding products...");
//     console.log(`Inserting 25 products for demo user Id : ${DemoUserId}`);
//     console.log("DATABASE_URL:", process.env.DATABASE_URL);
// }

// main()
// .catch((e) => {
//     console.error(e);
//     process.exit(1);
// })
// .finally(async () => {
//     await prisma.$disconnect();
// });
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // const demoUserId = "clh5lnu80000v0b60f4f4k3r3";
  const demoUserId = "64c943c4-1d30-42e8-9a8a-e77ae4553f22";

  const products = Array.from({ length: 25 }).map((_, i) => ({
    userId: demoUserId,
    name: `Product ${i + 1}`,
    sku: `SKU-${i + 1}`,
    price: 10.99 + i,
    quantity: 10 + i,
    lowStockAt: 5 + i,
    createdAt: new Date(Date.now() - i * 86400000),
  }));

  console.log("Seeding products into Neon...");

  // Actually insert into Neon
  const result = await prisma.product.createMany({
    data: products,
  });

  console.log(`✅ Inserted ${result.count} products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
