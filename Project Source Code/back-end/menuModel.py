import peewee as pw

from baseModel import BaseModel

#Model for Organisation
class Menu(BaseModel):
    RestaurantID = pw.CharField(primary_key=True, column_name="RestaurantID")
    RestaurantName = pw.CharField(column_name="RestaurantName")
    FoodName = pw.CharField(column_name="FoodName")
    Cuisine = pw.CharField(column_name="Cuisine")
    OrderStatus = pw.CharField(column_name="OrderStatus")
    Unit = pw.CharField(column_name="Unit")
    Price = pw.CharField(column_name="Price")
    Offer = pw.CharField(column_name="Offer")

    class Meta:
        table_name = ''