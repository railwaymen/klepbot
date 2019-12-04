from database import Database
from sklearn.neighbors import KNeighborsClassifier

class EventFit:
  def __init__(self):
    self.clf = KNeighborsClassifier(3)

  def call(self, data):
    self.learn()

    return self.clf.predict(data)

  def learn(self):
    data = self.prepare_data()

    self.clf.fit(*data)

  def prepare_data(self):
    # SQL CONNECT AND PREPARE ARRAYS
    return [[], []]
