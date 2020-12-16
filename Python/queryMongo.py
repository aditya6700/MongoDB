from pymongo import MongoClient
from bson.json_util import dumps
import json


# initialisation of connection
try:
    client = MongoClient()
    clinet = MongoClient('mongodb://localhost:27017/')
    print("conncection successful")
except Exception as e:
    print('connection failed\n',e)

# creating or connecting to database
db = client.pythonTest

# selection collection / creating collection 
myCollection = db.docs

# print all the data in collection
data = myCollection.find()
fdata = dumps(list(data), indent=2)
print(fdata)





