from sqlalchemy import  Column, String, Integer, ForeignKey
from db.session import Base
from sqlalchemy.orm import relationship

class fake_word(Base):
    __tablename__ = "words_fake"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    word = Column(String(50), index=True)
    msg = Column(String(100))
    letters = Column(Integer)

    stats_fake = relationship("stats_fake", back_populates="fake_word")

class stats_fake(Base):
    __tablename__="fake_stats"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    word_id = Column(Integer, ForeignKey("words_fake.id"))
    games = Column(Integer)
    hits = Column(Integer)

    fake_word = relationship("fake_word", back_populates="stats_fake")
