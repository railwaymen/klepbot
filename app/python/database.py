import psycopg2
import os

class Database:
  HOST = 'localhost'
  DATABASE = os.environ['DATABASE']
  USERNAME = os.environ['DB_USERNAME']
  PASSWORD = os.environ['DB_PASSWORD']

  def __init__(self):
    self.connection = self.connect()

  def connect(self):
    connection = psycopg2.connect(
      user = self.USERNAME,
      password = self.PASSWORD,
      host = self.HOST,
      database = self.DATABASE,
      port = '5432'
    )

    return connection

  def execute(self, sql):
    print("Executing - ", sql)
    cursor = self.connection.cursor()
    cursor.execute(sql)

    return self.connection.commit()
