"use client";
import { X } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ChartData{
    week:string;
    products:number;
}
export default function ProductChart({data}:{data:ChartData[]}){
    // console.log(data);
    return (
        <div className="h-48 w-full min-h-0 min-w-0" >
            <ResponsiveContainer width="100%" height={200}>
                <AreaChart
                   data={data}
                   margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                        dataKey="week"
                        stroke="#666"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                     />
                    <YAxis 
                        stroke="#666"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        allowDecimals={false}
                    />
                    <Area
                         type="monotone"
                         dataKey="products"
                         stroke="#8884d8"
                          fill="#8884d8"
                          fillOpacity={0.2}
                          strokeWidth={2}
                          dot={{ r: 2, fill: "#8b5cf6" }}
                          activeDot={{ r: 4, fill: "#8b5cf6" }} />
                    <Tooltip
                        contentStyle={{
                             backgroundColor: "white",
                             border: "1px solid #e5e7eb",
                             borderRadius: "8px",
                             boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
                             }}
                        labelStyle={{ fontWeight:"500", color: "#374151" }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}