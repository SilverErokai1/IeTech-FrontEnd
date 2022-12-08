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
        try{
          const {nameService,serviceId} = JSON.parse(req.body);
          const query = "UPDATE services SET name ='"+nameService
          +"' WHERE id = '"+serviceId+"';";
          await connection.execute(query);
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }
}
