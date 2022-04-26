from sklearn.cluster import SpectralClustering
import matplotlib.pyplot as plt
from DataPreprocessing import X_train

sc = SpectralClustering(n_clusters=4).fit(X_train)
print(sc)
 
labels = sc.labels_ 
plt.scatter(X_train[:,0], X_train[:,1], c=labels)
plt.show()