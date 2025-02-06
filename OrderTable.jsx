import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@radix-ui/react-table";

const OrderTable = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get("https://din-api.com/orders")
            .then(response => setOrders(response.data))
            .catch(error => console.error("Error fetching orders:", error));
    }, []);

    return (
        <Card className="p-4">
            <CardContent>
                <h2 className="text-xl font-bold mb-4">Beställningar</h2>
                <Table className="w-full border-collapse border border-gray-200">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Namn</TableHead>
                            <TableHead>Mobil</TableHead>
                            <TableHead>Restaurang</TableHead>
                            <TableHead>Typ</TableHead>
                            <TableHead>Beställning</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order, index) => (
                            <TableRow key={index}>
                                <TableCell>{order.name}</TableCell>
                                <TableCell>{order.phone}</TableCell>
                                <TableCell>{order.restaurant}</TableCell>
                                <TableCell>{order.type}</TableCell>
                                <TableCell>{order.items.join(", ")}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default OrderTable;
