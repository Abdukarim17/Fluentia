from databases import Database
from sqlalchemy import create_engine, MetaData
from config import DB_URL

# Initialize a database
database = Database(url=DB_URL)

# holds information about db schema
metadata = MetaData()

# connection point to interact with the db
engine = create_engine(url=DB_URL)