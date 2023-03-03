import peewee as pw

from baseModel import BaseModel

#Model for Organisation
class Customer(BaseModel):
    CustomerID = pw.CharField(primary_key=True, column_name="CustomerID")
    CustomerName = pw.CharField(column_name="CustomerName")
    PhNumber = pw.CharField(column_name="PhNumber")
    email = pw.CharField(column_name="email")
    password = pw.CharField(column_name="password")
    CreationTime = pw.CharField(column_name="CreationTime")
    UpdateTime = pw.CharField(column_name="UpdateTime")
    CurrentRestaurant = pw.CharField(column_name="CurrentRestaurant")

    class Meta:
        table_name = ''