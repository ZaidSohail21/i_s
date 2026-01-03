import { UserButton } from "@stackframe/stack";
import { BarChart3, Link, Package, Plus, Settings } from "lucide-react";

export default function Sidebar({ currentPath = "/dashboard" }: { currentPath: string }) {
    const navigation=[
        { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
        { name: 'Inventry', href: '/inventry', icon: Package },
        { name: 'Add Product', href: '/add-product', icon: Plus },
        { name: 'Settings', href: '/settings', icon: Settings }
    ]
    return (
        <div className="fixed left-0 top-0 bg-gray-900 text-white w-64 min-h-screen p-6 z-10">
            <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                    <BarChart3 className="w-7 h-7" />
                    <span className="text-lg font-semibold">Inventry App</span>
                </div>
            </div>
            <nav className="space-y-1">
                <div className="text-sm font-semibold text-gray-400 uppercase">
                    Inventry
                </div>
                {/* { navigation.map((item, key) => {
                    const Icon = item.icon;
                    const isActive = currentPath === item.href;
                    return(
                        <Link 
                        href={item.href}
                        key={key}
                        className={`flex items-center space-x-3 py-2 rounded-lg ${
                            isActive
                            ?
                            'text-gray-800 bg-purple-100'
                            :
                            'hover:bg-gray-800 text-gray-300'}`}
                        >
                            <Icon className="w-5 h-5" />
                            <div className="">{item.name}</div>
                        </Link>

                    );
                })} */}
            </nav>
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700">
                <div className="flex item-center justify-between">
                    <UserButton />
                </div>
            </div>
        </div>
    );
}