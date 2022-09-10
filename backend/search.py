import pandas as pd
import sqlite3

# def isempty(conn):
#     c = conn.cursor()

#     full = 0
#     exist = c.fetchone()

#     if exist is None:
#         return True
    
#     return False
    

# def initialize_db(df, conn):
#     conn.execute("""CREATE TABLE IF NOT EXISTS Securities (
#                     "security_id" VARCHAR,
#                     "root_symbol" VARCHAR, 
#                     "bbg" VARCHAR, 
#                     "symbol" VARCHAR, 
#                     "ric" VARCHAR, 
#                     "cusip" VARCHAR, 
#                     "isin" VARCHAR, 
#                     "bb_yellow" VARCHAR, 
#                     "bloomberg" VARCHAR, 
#                     "spn" VARCHAR, 
#                     "sedol" VARCHAR
#                     );""")
    
#     if isempty(conn):
#         for i in range(len(df)):
#             sql = f"""INSERT INTO Securities VALUES ('{str(df.at[i, 'security_id'])}',
#                                                 '{str(df.at[i, 'root_symbol'])}',
#                                                 '{str(df.at[i, 'bbg'])}',
#                                                 '{str(df.at[i, 'symbol'])}',
#                                                 '{str(df.at[i, 'ric'])}',
#                                                 '{str(df.at[i, 'cusip'])}',
#                                                 '{str(df.at[i, 'isin'])}',
#                                                 '{str(df.at[i, 'bb_yellow'])}',
#                                                 '{str(df.at[i, 'bloomberg'])}',
#                                                 '{str(df.at[i, 'spn'])}',
#                                                 '{str(df.at[i, 'sedol'])}');"""
#             conn.execute(sql)

def search_table(conn, priority, query):
    relevant_ids = dict()
    result = []
    conn.execute("PRAGMA case_sensitive_like=ON;")
    for symbol in priority:
        sql = f"SELECT security_id from securities where {symbol} LIKE '%{query}%'"
        a = conn.execute(sql)
        for i in a.fetchall():
            if not relevant_ids.get(i[0]):
                result.append(i[0])
                relevant_ids[i[0]] = 1
    
    return result

conn = sqlite3.connect('ShellhacksDB.db')

df = pd.read_csv('Securities - Schonfeld ShellHacks.csv')

# initialize_db(df, conn)

priority = {"root_symbol", "bbg", "symbol", "ric", "cusip", "isin", "bb_yellow", "bloomberg", "spn", "security_id", "sedol"}

query = "HK"

print(search_table(conn, priority, query))
