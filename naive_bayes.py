from sklearn.naive_bayes import GaussianNB
from DataPreprocessing import X_train, X_test, Y_train, Y_test

gnb = GaussianNB()
gnb.fit(X_train,Y_train)
score = str(gnb.score(X_test,Y_test)*100)[:5]

def predict(list):
    return gnb.predict([list])
