
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
    constructor(table){
        this.client = new Client({
            user: dbinfo.user,
            host: dbinfo.host,
            database: dbinfo.db,
            password: dbinfo.pass,
            port: dbinfo.port,
        });
	this.table = table;
	this.connect();
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
    async findAll() {
        // TODO: check if table is valid


        const query = `SELECT * FROM ${this.table}`;
        try {
            const res = await this.client.query(query); 
            console.log("All table data: \n");
            res.rows.forEach(row => console.log(row));
	    return res.rows;
        } catch (err) {
            console.error("Query error:", err);
        }
    }

    async find(id) {
    // TODO: check if table is valid


        const query = `SELECT * FROM ${this.table} WHERE customerid = $1`; 
        
        try {
            const res = await this.client.query(query, [id]);
            console.log("Query result: \n");
            res.rows.forEach(row => console.log(row));
	    return res.rows[0];
        } catch (err) {
            console.error("Query error:", err);
        }
    }


    // insert(table,obj){




    // }

    async insert(obj) {
        const columns = Object.keys(obj).join(", ");
        const values = Object.values(obj);
        const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");
        
        const query = `INSERT INTO ${this.table} (${columns}) VALUES (${placeholders}) RETURNING *`;
        try {
            const res = await this.client.query(query, values);
            return res.rows[0];  // Return the inserted row
        } catch (err) {
            console.error("Insert error:", err);
        }
    }





}

export default SQLDAO;

//const DAO = new SQLDAO();


//(async () => {
//    await DAO.connect();  // Connect to the database
//
//    await DAO.findAll("customer");  // Query all customers
//    await DAO.find("customer", 0);  // Query customer with ID 1

//   await DAO.disconnect();  // Disconnect from the database
//})();
