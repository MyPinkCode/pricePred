from sklearn.neighbors import KNeighborsClassifier
from DataPreprocessing import X_train, X_test, Y_train, Y_test

neigh = KNeighborsClassifier(n_neighbors=2)
neigh.fit(X_train,Y_train)
score = str(neigh.score(X_test,Y_test)*100)[:5] 

def predict(list):
    return neigh.predict([list])
