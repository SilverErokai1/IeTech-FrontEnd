import mysql from "mysql2/promise";
export default async function handler(req, res) {
    const connection = await mysql.createConnection({
        host: "localhost",
        database: "ietech",
        user: "root",
        password: "",
        port: "3306",
    });
    if (req.method === "POST") {
        try {         
            //Lấy các order của service
            const check = 
            "SELECT orders.id order_id FROM plans, orders, services WHERE plans.id = orders.plan_id AND plans.service_id = services.id AND services.id = ?";
            const val = [req.body.service_id];
            const [res] = await connection.execute(check, val);
            //Xóa các order của service
            res.forEach(async (order) => {
                const query = "DELETE FROM orders WHERE id = ?";
                const values = [order.order_id];
                const [rows] = await connection.execute(query, values);
        });
            //Lấy các plan của service
            const check2 =
            "SELECT plans.id plan_id FROM plans, services WHERE plans.service_id = services.id AND services.id = ?";
            const val2 = [req.body.service_id];
            const [res2] = await connection.execute(check2, val2);
            //Xóa các plan của service
            res2.forEach(async (plan) => {
                const query = "DELETE FROM plans WHERE id = ?";
                const values = [plan.plan_id];
                const [rows] = await connection.execute(query, values);
            });
            //Xóa service
            const query = "DELETE FROM services WHERE id = ?";
            const values = [req.body.service_id];
            const [rows] = await connection.execute(query, values);
            connection.end();
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    }
}
