import sqlite3


DATABASE_NAME = "auratunes.db"


def get_connection():
    connection = sqlite3.connect(
        DATABASE_NAME
    )

    connection.row_factory = sqlite3.Row

    return connection


def close_connection(connection):
    if connection:
        connection.close()