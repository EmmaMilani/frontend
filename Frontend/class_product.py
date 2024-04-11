from dbManager import DBManager
import mysql.connector
from mysql.connector import Error
import json

class Product:
    def __init__(self, id, nome, marca, prezzo):
        self._id = id
        self._nome = nome
        self._marca = marca
        self._prezzo = prezzo
        
    @property
    def id(self):
        return self._id

    @id.setter
    def id(self, value):
        self._id = value

    @property
    def nome(self):
        return self._nome

    @nome.setter
    def nome(self, value):
        self._nome = value

    @property
    def prezzo(self):
        return self._prezzo

    @prezzo.setter
    def prezzo(self, value):
        self._prezzo = value

    @property
    def marca(self):
        return self._marca

    @marca.setter
    def marca(self, value):
        self._marca = value

    @staticmethod
    def connector():
        try:
            #db_manager = DBManager("192.168.2.200", 3306, "emma_milani", "wrap.dioxin.matchmaking.", "emma_milani_ecommerce") #scuola
            db_manager = DBManager("127.0.0.1", 3306, "prodotti", "prodotti", "emma_milani_ecommerce") #casa
            #db_manager = DBManager("127.0.0.1", 3306, "classe5e", "classe5e", "classe5e_ecommerce") #laptop scuola numero 7 e 9
            conn = db_manager.connect()
            return conn
        except Error as e:
            print("Errore durante la connessione:", str(e))

    @staticmethod
    def fetchAll():
        try:
            db = Product.connector()
            cursor = db.cursor()
            sql = "select * from products"
            cursor.execute(sql)
            products = cursor.fetchall()
            return products
        except Error as e:
            print("Errore fechAll:", str(e))
        finally:
            cursor.close()

    @staticmethod
    def Create(product_data):
        try:
            db = Product.connector()
            cursor = db.cursor()
            sql = "INSERT INTO products (nome, marca, prezzo) VALUES (%s, %s, %s)"
            cursor.execute(sql, (product_data['nome'], product_data['marca'], product_data['prezzo']))
            db.commit()
            product_id = cursor.lastrowid
            cursor.close()
            return Product(id=product_id, nome=product_data["nome"], marca=product_data["marca"], prezzo=product_data["prezzo"])
        except Error as e:
            print(f"Errore durante creazione prodotto: {e}")

    @staticmethod
    def find(product_id): #funziona
        try:
            db = Product.connector()
            cursor = db.cursor()
            sql = "select * from products where id = %s"
            cursor.execute(sql, (product_id,))
            product = cursor.fetchone()
            if product:
                #return Product(id=product[0], nome=product[1], prezzo=product[2], marca=product[3]) #scuola
                return Product(id=product[0], nome=product[1], marca=product[2], prezzo=product[3]) #casa
            else:
                return None
        except Error as e:
            print(f"Errore durante la ricerca del prodotto: {e}")
        finally:
            cursor.close()

    def update(self, product_data):
        try:
            conn = Product.connector()
            cursor = conn.cursor()
            cursor.execute("UPDATE products SET marca = %s, nome = %s, prezzo = %s WHERE id = %s", (product_data['marca'], product_data['nome'], product_data['prezzo'], self.id,))
            conn.commit()
            conn.close()
        except mysql.connector.Error as e:
            print("Errore durante l'aggiornamento del prodotto:", str(e))

    def delete(self):
        try:
            db = Product.connector()
            cursor = db.cursor()
            sql = "DELETE FROM products WHERE id = %s"
            cursor.execute(sql, (self.id,))
            db.commit()
            cursor.close()
        except Error as e:
            print(f"Errore durante l'eliminazione del prodotto: {e}")