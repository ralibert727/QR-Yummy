import peewee as pw

# Variables for database connection

# Dev db config
endpoint = 'qryummyv2.cpda1jo1k8hj.us-east-1.rds.amazonaws.com'
port = 3306
dbuser = 'root'
password = 'Password123'
database='qryummy'

# Instantiating mysql database
qryummy = pw.MySQLDatabase(database, host = endpoint, port = port, user = dbuser, passwd = password)

class BaseModel(pw.Model):
    """A base model that will use our MySQL database"""

    class Meta:
        database = qryummy
