
import pg from 'pg'


const { Client } = pg

// TODO: Move to another file
const dbinfo ={
    db: "umbrelladb",
    host: "localhost",
    user: "postgres",
    pass: "1234",
    port: "5433"
    };



    // const client = new Client({
    //     user: dbinfo.user,
    //     host: dbinfo.host,
    //     database: dbinfo.db,
    //     password: dbinfo.pass,
    //     port: dbinfo.port,
    
    
    
    // })
    
    
    // await client.connect()
    //     .then(()=> console.log("Connection succesful."))
    //     .catch(e => console.log)
        





class SQLDAO {
    constructor(){
        this.client = new Client({
            user: dbinfo.user,
            host: dbinfo.host,
            database: dbinfo.db,
            password: dbinfo.pass,
            port: dbinfo.port,
        });
    }

 

    async connect() {
        try {
            await this.client.connect();
            console.log("Connection successful.");
        } catch (err) {
            console.error("Connection error:", err);
            throw err;
        }
    }
    async disconnect(){
    
        await this.client.end();
        console.log("Succesfully disconnected from the database.")
    }



    // Find stuff
    async findAll(table) {
        // TODO: check if table is valid


        const query = `SELECT * FROM ${table}`;
        try {
            const res = await this.client.query(query); 
            console.log("All table data: \n");
            res.rows.forEach(row => console.log(row));
        } catch (err) {
            console.error("Query error:", err);
        }
    }

    async find(table, id) {
    // TODO: check if table is valid


        const query = `SELECT * FROM ${table} WHERE customerid = $2`; 
        
        try {
            const res = await this.client.query(query, [id]);
            console.log("Query result: \n");
            res.rows.forEach(row => console.log(row));
        } catch (err) {
            console.error("Query error:", err);
        }
    }


    insert(table,obj){




    }





}


const DAO = new SQLDAO();

(async () => {
    await DAO.connect();  // Connect to the database

    await DAO.findAll("customer");  // Query all customers
    await DAO.find("customer", 0);  // Query customer with ID 1

    await DAO.disconnect();  // Disconnect from the database
})();