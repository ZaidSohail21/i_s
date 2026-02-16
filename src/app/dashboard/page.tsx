
import { prisma } from "@/lib/prisma"
import Sidebar from "../component/sidebar"
import { getCurrentUser } from "@/lib/auth";
import { TrendingUp } from 'lucide-react'
import ProductChart from "../component/products-chart";

export default async function DashboardPage() {

    const user = await getCurrentUser();
    const userId = user.id;

    const [totalProducts, lowStock, allProducts] = await Promise.all([
        prisma.product.count({ where: { userId } }),
        prisma.product.count({
            where: {
                userId,
                lowStockAt: { not: null },
                quantity: { lte: 5 }
            }
        }),
        prisma.product.findMany({
            where: { userId },
            select: { price: true, quantity: true, createdAt: true },
        })
    ]);

    const recent = await prisma.product.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 5,
    });

    const totalValue = allProducts.reduce((sum, product) => sum + Number(product.price) * Number(product.quantity), 0);
    const inStockCount = allProducts.filter(product => product.quantity > 5).length;
    const outOfStockCount = allProducts.filter(product => Number(product.quantity) === 0).length;
    const lowStockCount = allProducts.filter((p) => Number(p.quantity) <= 5 && Number(p.quantity) >= 1).length;

    const inStockPercentage = totalProducts > 0 ? Math.round((inStockCount / totalProducts) * 100) : 0;
    const lowStockPercentage = totalProducts > 0 ? Math.round((lowStockCount / totalProducts) * 100) : 0;
    const outOfStockPercentage = totalProducts > 0 ? Math.round((outOfStockCount / totalProducts) * 100) : 0;

    const now = new Date();
    const weeklyProductData = [];

    for (let i = 11; i >= 0; i--) {
        const weekStart = new Date(now);
        weekStart.setDate(weekStart.getDate() - i * 7);
        weekStart.setHours(0, 0, 0, 0);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);

        const weekLabel = `${String(weekStart.getMonth() + 1).padStart(2, "0")}/${String(weekStart.getDate() + 1).padStart(2, "0")}`

        const weekProduct = allProducts.filter((product) => {
            const productDate = new Date(product.createdAt);
            return productDate >= weekStart && productDate <= weekEnd;
        })

        weeklyProductData.push({
            week: weekLabel,
            products: weekProduct.length
        })
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar currentPath="/dashboard" />

            {/* MAIN */}
            <main className="p-4 md:ml-64 md:p-8">

                {/* Header */}
                <div className="mb-6 md:mb-8">
                    <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                        Dashboard
                    </h1>
                    <p className="text-sm text-gray-500">
                        Welcome Back! Overview of your inventory system
                    </p>
                </div>

                {/* Key Metrics + Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-8">

                    {/* Key Metrics */}
                    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Key Metrics
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

                            {/* Total Products */}
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold">{totalProducts}</div>
                                <div className="text-sm text-gray-600">Total Products</div>
                            </div>

                            {/* Total Value */}
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold">{Number(totalValue).toFixed(0)}</div>
                                <div className="text-sm text-gray-600">Total Value</div>
                            </div>

                            {/* Low Stock */}
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold">{lowStock}</div>
                                <div className="text-sm text-gray-600">Low Stock</div>
                            </div>

                        </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
                        <h2 className="text-lg font-semibold mb-4">
                            New Products per Week
                        </h2>

                        <div className="w-full min-w-0" style={{ height: 220 }}>
                            <ProductChart data={weeklyProductData} />
                        </div>
                    </div>
                </div>

                {/* Stock + Efficiency */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">

                    {/* Stock Levels */}
                    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
                        <h2 className="text-lg font-semibold mb-4">
                            Stock Levels
                        </h2>

                        <div className="space-y-3">
                            {recent.map((product, key) => {
                                const stockLevel = product.quantity === 0
                                    ? 0
                                    : product.quantity <= (product.lowStockAt || 5)
                                        ? 1
                                        : 2;

                                const bgColor = ["bg-red-600", "bg-yellow-600", "bg-green-600"]
                                const textColor = ["text-red-600", "text-yellow-600", "text-green-600"]

                                return (
                                    <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-3 h-3 rounded-full ${bgColor[stockLevel]}`} />
                                            <span className="text-sm font-medium">{product.name}</span>
                                        </div>
                                        <span className={`text-sm font-medium ${textColor[stockLevel]}`}>
                                            {product.quantity} units
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Efficiency */}
                    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 text-center">
                        <h2 className="text-lg font-semibold mb-4">
                            Efficiency
                        </h2>

                        <div className="flex justify-center">
                            <div className="relative w-32 h-32 md:w-48 md:h-48">
                                <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
                                <div
                                    className="absolute inset-0 rounded-full border-8 border-purple-600"
                                    style={{
                                        clipPath:
                                            "polygon(50% 50%, 50% 0%, 100% 0% , 100% 100%, 0% 100%, 0% 50%)",
                                    }}
                                ></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div>
                                        <div className="text-xl md:text-2xl font-bold">
                                            {inStockPercentage}%
                                        </div>
                                        <div className="text-xs md:text-sm text-gray-500">
                                            In Stock
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 text-sm text-gray-600 space-y-1">
                            <p>Low Stock: {lowStockPercentage}%</p>
                            <p>Out of Stock: {outOfStockPercentage}%</p>
                        </div>
                    </div>

                </div>

            </main>
        </div>
    )
}
