import peewee as pw

# Variables for database connection

# Dev db config
endpoint = ''
port = 3306
dbuser = ''
password = ''
database = ''

# Instantiating mysql database
qryummy = pw.MySQLDatabase(database, host = endpoint, port = port, user = dbuser, passwd = password)

class BaseModel(pw.Model):
    """A base model that will use our MySQL database"""

    class Meta:
        database = qryummy
