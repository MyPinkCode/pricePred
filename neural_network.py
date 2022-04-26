from sklearn.neural_network import MLPClassifier
from DataPreprocessing import X_train, X_test, Y_train, Y_test

clf = MLPClassifier(random_state=1, max_iter=300).fit(X_train, Y_train)
clf.predict(X_test[:,:])
score = str(clf.score(X_test,Y_test)*100)[:5] 

def predict(list):
    return clf.predict([list])