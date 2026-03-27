from sqlalchemy import Column, Integer, String
from database import Base

class Target(Base):
    __tablename__ = "targets"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    date = Column(String)
    party_size = Column(Integer)
    mode = Column(String)
