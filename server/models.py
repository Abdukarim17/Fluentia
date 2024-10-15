import uuid
from sqlalchemy import Table, Column, Integer, String, ForeignKey, Float
from sqlalchemy.dialects.mysql import BINARY
from sqlalchemy.dialects.postgresql import JSON

from contextlib import asynccontextmanager
from fastapi import FastAPI

from database import metadata, engine

def generate_uuid():
    return uuid.uuid4().bytes

# table that stores user information
UserInformation = Table(
    "users", 
    metadata, 
    Column("user_id", BINARY(16), primary_key=True, default=generate_uuid, unique=True),
    Column("email", String(255), unique=True, nullable=False, index=True),  # Define length for email
    Column("first_name", String(100), nullable=False),  # Define length for first name
    Column("last_name", String(100), nullable=False),  # Define length for last name
    Column("username", String(25), nullable=False),
    Column("password", String(25), nullable=False),
    Column("xp", Integer, nullable=False, default=0),  # Define length for phone number
    Column("wholistic_skill", Float, nullable=False, default=0.0),  # skill level used for match making user2user calls
    Column("lesson_accuracy", Float, nullable=False, default=0.0),  # normalized weighted average of lesson accuracy score
    Column("conversational_score", Float, nullable=False, default=0.0))  # normalized weighted average of conversational score

# table that stores the keys for associating the tier with the module
Tiers = Table(
    "tiers",
    metadata,
    Column("tier_id", BINARY(16), primary_key=True, default=generate_uuid, unique=True),
    Column("tier_level", Integer, nullable=False),)

# table that stores the modules
Modules = Table(
    "modules",
    metadata,
    Column("module_id", BINARY(16), primary_key=True, default=generate_uuid, unique=True),
    Column("module_number", Integer, nullable=False),)

# table that actually stores the user progress for each module and tier
UserModuleProgress = Table(
    "user_module_progress",
    metadata,
    Column("user_id", BINARY(16), ForeignKey("users.user_id"), primary_key=True, nullable=False),
    Column("module_id", BINARY(16), ForeignKey("modules.module_id"), primary_key=False, nullable=False),
    Column("tier_id", BINARY(16), ForeignKey("tiers.tier_id"), primary_key=False, nullable=False),
    Column("progress", JSON, nullable=True))

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Initialize the database tables and yield the app.
    """

    # Create all tables in the metadata
    metadata.create_all(engine)
    print('DB tables initialized')
    yield

    # on shutdown