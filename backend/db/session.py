from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from config.settings import sqlalchemy_cfg

from sqlalchemy.ext.declarative import declarative_base

engine = create_engine (sqlalchemy_cfg.DATABASE_URI, pool_pre_ping=True)
DBSession = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()