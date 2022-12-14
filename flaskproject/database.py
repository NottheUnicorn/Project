import sqlite3


class Database:
    def __init__(self, name):
        self.connection = sqlite3.connect(name)
        self.cursor = self.connection.cursor()

    def initialize(self, query):
        try:
            self.cursor.execute(query)
            self.connection.commit()
        except sqlite3.Error as e:
            print(e)

    def create(self, query, name, price, slug,category,image,shortdescription,content):
        try:
            self.cursor.execute(query, (name, price, slug,category,image,shortdescription,content))
            self.connection.commit()
        except sqlite3.Error as e:
            print(e)

    def read(self, query, student_id):
        try:
            #if type(int(student_id[0])) == str:
                #raise ValueError
            query = self.cursor.execute(query, student_id)
            self.connection.commit()
            return query.fetchall()
        except sqlite3.Error as e:
            return {'error': str(e)}
        except ValueError:
            return {'error': 'ID must be an integer'}
    def list(self, query):
        try:
            query = self.cursor.execute(query)
            self.connection.commit()
            return query.fetchall()
        except sqlite3.Error as e:
            return {'error': str(e)}
        except ValueError:
            return {'error': 'ID must be an integer'}
    def update(self, query, student_info):
        try:
            self.cursor.execute(query, student_info)
            self.connection.commit()
        except sqlite3.Error as e:
            print(e)

    def delete(self, query, student_id):
        try:
            if type(int(student_id[0])) == str:
                raise ValueError
            self.cursor.execute(query, student_id)
            self.connection.commit()
        except sqlite3.Error as e:
            print(e)
        except ValueError:
            print('ID must be an integer')

    def __del__(self):
        self.connection.close()
