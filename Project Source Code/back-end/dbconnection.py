import time
import json
from playhouse.shortcuts import model_to_dict
import datetime
import pytz

from baseModel import qryummy
from menuModel import Menu
from userModel import Customer
from cartModel import Cart

# Variables for database connection
endpoint = ''
port = 3306
dbuser = ''
password = ''
database=''


# Timing function executions
def timeit(f):
    def timed(*args, **kw):
        ts = time.time()
        result = f(*args, **kw)
        te = time.time()
        print(f'Function: {f.__name__}')
        print(f'*  args: {args}')
        print(f'*  kw: {kw}')
        print(f'*  execution time: {(te - ts) * 1000:8.2f} ms')
        return result

    return timed


# Create database connection function
@timeit
def createConnection():
    try:
        qryummy.close()
        #when data base configuration is ready then try to connect
        conn = qryummy.connect()
        print("Connection Check: ")
        print(conn)

        return True
    except Exception as e:
        print("Exception at database connect")
        print(e)
        if "Connection already opened." in str(e):
            return True
        else:
            return "error"

# Close database connection function
@timeit
def closeConnection():
    try:
        # While quering completed then close the database connection
        dbCloseResult = qryummy.close()
        print("Close Connection Check: ")
        print(dbCloseResult)

        return True
    except Exception as e:
        print("Exception at database close")
        print(e)
        if "Connection already closed." in str(e):
            return True
        else:
            return "error"

@timeit
def insertuserdata(newUserPayload):
    try:
        # Creating connection with database
        connStatus = createConnection()
        print("Connection Status: ")
        print(connStatus)
        if connStatus == True:
            print("====Connection Successful====")

            #Overwriting customer table name in the model
            Customer._meta.table_name = 'Customer'

            #NYC time
            nyc_datetime = datetime.datetime.now(pytz.timezone('US/Eastern')).strftime("%Y-%m-%d %H:%M:%S")

            newUserPayload1 = {
                "CustomerID": newUserPayload["CustomerID"], 
                "CustomerName": newUserPayload["CustomerName"], 
                "PhNumber": newUserPayload["PhNumber"], 
                "email": newUserPayload["email"], 
                "password": newUserPayload["password"], 
                "CreationTime": nyc_datetime, 
                "UpdateTime": nyc_datetime, 
                "CurrentRestaurant": newUserPayload["CurrentRestaurant"]
            }

            #After successful connection -- Query to add new user data in customer table
            CustomerData = Customer.insert(CustomerID = newUserPayload1["CustomerID"], CustomerName = newUserPayload1["CustomerName"], 
                                    PhNumber = newUserPayload1["PhNumber"], email = newUserPayload1["email"], 
                                    password = newUserPayload1["password"], CreationTime = newUserPayload1["CreationTime"], 
                                    UpdateTime = newUserPayload1["UpdateTime"], CurrentRestaurant = newUserPayload1["CurrentRestaurant"]).execute()

            print ("AFTER INSERTING",newUserPayload1)

            closeConnStatus = closeConnection()
            print("Close Connection Result: ")
            print(closeConnStatus)

            return {
            		"status": "success", 
            		"message": "New user added successfully"
            		}
        
        elif connStatus == False:
            print("====Connection Declined====")
            return {"status": "error"}

        else:
            print("====Unknown Connection Result====")
            return {"status": "error"}

    except Exception as e:
        print("====Exception Occured====")
        print(e)
        return {"status": "error"}

@timeit
def getuserdata(CustomerID):

    try:
        # Creating connection with database
        connStatus = createConnection()
        print("Connection Status: ")
        print(connStatus)
        if connStatus == True:
            print("====Connection Successful====")

            #Overwriting customer table name in the model
            Customer._meta.table_name = 'Customer'

            # #After successful connection -- Fetch user data using customer ID
            matchedCustomer = Customer.select().where(Customer.CustomerID == CustomerID).get()
            matchedCustomer = json.dumps(model_to_dict(matchedCustomer))

            closeConnStatus = closeConnection()
            print("Close Connection Result: ")
            print(closeConnStatus)

            return {
                    "status": "success", 
                    "body": json.loads(matchedCustomer)
                    }
        
        elif connStatus == False:
            print("====Connection Declined====")
            return {"status": "error"}

        else:
            print("====Unknown Connection Result====")
            return {"status": "error"}

    except Exception as e:
        print("====Exception Occured====")
        print(e)
        return {"status": "error"}


@timeit
def modifyuserdata(newUserPayload):
    try:
        # Creating connection with database
        connStatus = createConnection()
        print("Connection Status: ")
        print(connStatus)
        if connStatus == True:
            print("====Connection Successful====")

            #NYC time
            nyc_datetime = datetime.datetime.now(pytz.timezone('US/Eastern')).strftime("%Y-%m-%d %H:%M:%S")

            # newUserPayload = {
            #     "CustomerID": newUserPayload["CustomerID"], 
            #     "CustomerName": newUserPayload["CustomerName"], 
            #     "PhNumber": newUserPayload["PhNumber"], 
            #     "email": newUserPayload["email"], 
            #     "password": newUserPayload["password"], 
            #     "UpdateTime": nyc_datetime,
            #     "CurrentRestaurant": newUserPayload["CurrentRestaurant"]
            # }
            newUserPayload["UpdateTime"]=nyc_datetime

            # print("BEFORE EXECUTION",newUserPayload)

            # After successful connection -- Query to add new customer data in device table
            CustomerData = Customer.update(newUserPayload).where(Customer.CustomerID == newUserPayload["CustomerID"]).execute()

            print("Successfully UPDATED customer DETAILS in customer Table \n")

            closeConnStatus = closeConnection()
            print("Close Connection Result: ")
            print(closeConnStatus)

            return {
                    "status": "success", 
                    "body" : CustomerData
                    }
        
        elif connStatus == False:
            print("====Connection Declined====")
            return {"status": "error"}

        else:
            print("====Unknown Connection Result====")
            return {"status": "error"}

    except Exception as e:
        print("====Exception Occured====")
        print(e)
        return {"status": "error"}
    
@timeit
def deleteuserdata(CustomerID):
    try:
        # Creating connection with database
        connStatus = createConnection()
        print("Connection Status: ")
        print(connStatus)
        if connStatus == True:
            print("====Connection Successful====")

            #Overwriting customer table name in the model
            Customer._meta.table_name = 'Customer'

            #After successful connection -- Query to delete user data using device Id
            deleteCustomer= Customer.delete().where(Customer.CustomerID == CustomerID).execute()

            closeConnStatus = closeConnection()
            print("Close Connection Result: ")
            print(closeConnStatus)

            return {"status": "success"}
        
        elif connStatus == False:
            print("====Connection Declined====")
            return {"status": "error"}

        else:
            print("====Unknown Connection Result====")
            return {"status": "error"}

    except Exception as e:
        print("====Exception Occured====")
        print(e)
        return {"status": "error"}

@timeit
def login(newUserPayload):
    
    try:
        # Creating connection with database
        connStatus = createConnection()
        print("Connection Status: ")
        print(connStatus)
        if connStatus == True:
            print("====Connection Successful====")

            #Overwriting customer table name in the model
            Customer._meta.table_name = 'Customer'

            #After successful connection -- Check Device existence using device ID
            matchedCustomerResponse = Customer.select().where(Customer.email == newUserPayload["email"]).exists()

            closeConnStatus = closeConnection()
            print("Close Connection Result: ")
            print(closeConnStatus)

            if matchedCustomerResponse == True:

                matchedCustomer = Customer.select().where(Customer.email == newUserPayload["email"]).get()
                matchedCustomer = json.loads(json.dumps(model_to_dict(matchedCustomer)))

                if matchedCustomer["password"] == newUserPayload["password"]:

                    return {
                        "status": "success",
                        "message": "login successful"
                    }
                
                else:
                    return {
                        "status": "error",
                        "message": "login failed -- Password Mismatch"
                    }

            elif matchedCustomerResponse == False:
                return {
                    "status": "error",
                    "message": "User Not Found"
                }

            else:
                return {
                    "status": "error",
                    "message": "User Not Found"
                }
        
        elif connStatus == False:
            print("====Connection Declined====")
            return {"status": "error"}

        else:
            print("====Unknown Connection Result====")
            return {"status": "error"}

    except Exception as e:
        print("====Exception Occured====")
        print(e)
        return {"status": "error"}

@timeit
def addtocart(event, context):
    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
    
@timeit
def fetchmenudetails(event, context):
    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
    

