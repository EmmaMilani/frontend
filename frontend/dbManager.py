import mysql.connector
from mysql.connector import Error

class DBManager:
    def __init__(self, host, port, username, password, dbname):
        self.host = host
        self.port = port
        self.username = username
        self.password = password
        self.dbname = dbname

    def connect(self):
        try:
            connection = mysql.connector.connect(
                host=self.host,
                port=self.port,
                user=self.username,
                password=self.password,
                database=self.dbname
            )
            return connection
        except Error as e:
            print(f"Connessione al database fallita: {e}")
            return None