from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from db.session import Base

class Superuser(Base):
    __tablename__ = "superuser"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    superuser = Column(String(50), unique = True, index=True)

    tokens = relationship("Token", 
                                backref="superuser",
                                lazy=True,
                                cascade="all, delete-orphan")

class Token(Base):
    __tablename__ = "token"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    token = Column(String(250), unique = True, index=True)
    superuser_id = Column(Integer, ForeignKey("superuser.id", ondelete="CASCADE"))
