from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from db.session import Base


class Word(Base):
    __tablename__ = "word"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    word = Column(String(50), unique = True, index=True)
    playword = Column(String(50), unique = True, index=True)
    letters = Column(Integer)

    language_id = Column(Integer, ForeignKey("language.id", ondelete="CASCADE"))

    statistics = relationship("Statistics", 
                                backref="word",
                                lazy=True,
                                cascade="all, delete-orphan")
    hints = relationship("Hints",
                            backref="word",
                            lazy=True,
                            cascade="all, delete-orphan")


class Language(Base):
    __tablename__ = "language"

    id = Column(Integer, primary_key=True, autoincrement=True)
    language = Column(String(5),unique=True)

    word = relationship("Word",
                        lazy=True,
                        cascade="all, delete-orphan")


class Statistics(Base):
    __tablename__ = "statistics"

    id = Column(Integer, primary_key=True, autoincrement=True)
    games = Column(Integer)
    hits = Column(Integer)

    word_id = Column(Integer, ForeignKey("word.id", ondelete="CASCADE"))


class Hints(Base):
    __tablename__ = "hints"

    id = Column(Integer, primary_key=True, autoincrement=True)
    hint = Column(String(200))
    
    word_id = Column(Integer, ForeignKey("word.id", ondelete="CASCADE"))