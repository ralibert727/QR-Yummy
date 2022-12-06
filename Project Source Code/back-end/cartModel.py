import peewee as pw

from baseModel import BaseModel

#Model for Organisation
class Cart(BaseModel):
    ID = pw.CharField(primary_key=True, column_name="ID")
    RestaurantName = pw.CharField(column_name="RestaurantName")
    OrderNumber = pw.IntegerField(column_name="OrderNumber")
    FoodName = pw.CharField(column_name="FoodName")
    Cuisine = pw.CharField(column_name="Cuisine")
    OrderStatus = pw.CharField(column_name="OrderStatus")
    Unit = pw.CharField(column_name="Unit")
    Price = pw.CharField(column_name="Price")
    CustomerName = pw.CharField(column_name="CustomerName")

    class Meta:
        table_name = 'Cart'