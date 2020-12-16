from pymongo import MongoClient

# 1. creating a connection
try:
    print("Connection Succesful")
except Exception as e:
    print("connection failed \n",e)
   
client = MongoClient()

# 2. initalizing config detials

client = MongoClient("mongodb://localhost:27017/")
# or
# client = MongoClient('localhost',27017)

# 3. creating or switching to a database

myDb = client.pythonTest
# or 
# myDb = client['pythonTest']

# 4. accessing the collection

myCollection = myDb.docs
# or
# myCollection = myDb['docs']

# 5. dictionary(document) to be added in the database 
doc1={ 
    'title': 'MongoDB',  
    'description': 'MongoDB is no SQL database',  
    'tags': ['mongodb', 'database', 'NoSQL'],  
    'viewers': 104,
    'active': True
} 
  
# 6. inserting the data in the database 
res = myDb.docs.insert_one(doc1) 
print('insertion successful')
