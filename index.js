import { MongoClient} from 'mongodb';
import {ObjectId} from 'mongodb';
const url='mongodb://127.0.0.1:27017';
const client=new MongoClient(url);
const database='customerCLI';

export const listcustomer = () => {
  async function getdata(){
    let result=await client.connect();
    if(result){
      console.log('connect');
    }
    let db=result.db(database);
    let collection=db.collection('customer1');
    let response=await collection.find({}).toArray();
    console.log(response);
    console.log(`${response.length} customers`);
    result.close();
  }
  getdata();
}
    
//add customer
export const addcustomer=(answers)=>{
    async function adddata(){
        let result=await client.connect();
        let db=result.db(database);
        let collection=db.collection('customer1');
        //console.log(answers);
        await collection.insertOne({"firstname":answers.firstname,"lastname":answers.lastname,
           "phone":answers.phone,"email":answers.email});
            console.log("Successfully added");
           result.close(); 
          }
      adddata();
    }
      //find customer
   export const findcustomer=(name)=>{
   async function finddata(){       
     let result=await client.connect();
      let db=result.db(database);
      let collection=db.collection('customer1');
      let response=await collection.find({$or: [{"firstname":name},
      {"lastname":name}]}).toArray();
      console.log(response);
      console.log(response.length + " matches");
      result.close();
    }
      
  finddata();
    }
export const updatecustomer=(_id,answers)=>{
  async function updatedata(){
    let result=await client.connect();
    let db=result.db(database);
    let collection=db.collection('customer1');
    await collection.updateOne({"_id":new ObjectId(_id)},
      {$set:
        {
        "firstname":answers.firstname,"lastname":answers.lastname,"phone":answers.phone,"email":answers.email}});
      console.log("updated successfully");
    result.close();
  }  
updatedata();
}


//delete 
export const removecustomer=(_id)=>{
  async function removedata(){
    let result=await client.connect();
    let db=result.db(database);
    let collection=db.collection('customer1');
    await collection.deleteOne({"_id":new ObjectId(_id)});
      console.log("Removed Succesfully");
    result.close();
  }  
removedata();
}