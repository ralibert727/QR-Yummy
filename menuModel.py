import peewee as pw

from baseModel import BaseModel

#Model for Organisation
class Menu(BaseModel):
    OrderID = pw.IntegerField(primary_key=True, column_name="OrderID", constraints=[pw.SQL('AUTO_INCREMENT')])
    RestaurantName = pw.CharField(column_name="RestaurantName")
    PhNumber = pw.IntegerField(column_name="PhNumber")
    email = pw.CharField(column_name="email")
    password = pw.CharField(column_name="password")
    CreationTime = pw.DateTimeField(column_name="CreationTime")
    UpdateTime = pw.DateTimeField(column_name="UpdateTime")
    DeletionTime = pw.DateTimeField(column_name="DeletionTime")
    CurrentRestaurant = pw.CharField(column_name="CurrentRestaurant")

    class Meta:
        table_name = 'Menu'