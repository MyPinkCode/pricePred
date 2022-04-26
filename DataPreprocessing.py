from sklearn.preprocessing import LabelEncoder , OneHotEncoder 
import numpy as np
import pandas as pd 
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from csv import writer

# import dataset
names=['title','price','rating','review','brand','area','under50']
dataset =pd.read_csv("data.csv",names=names)
# replace area and brand by numirical data

area=dataset["area"].value_counts().index.tolist()
brand=dataset["brand"].value_counts().index.tolist()
j=0
for i in area :
   dataset.area=dataset.area.replace(i,j)
   j=j+1
j=0
for i in brand :
   dataset.brand=dataset.brand.replace(i,j)
   j=j+1

# handeling missing values
X = dataset.iloc[:,1:6 ].values
imputer = SimpleImputer(missing_values=np.nan, strategy='mean') 
imputer = imputer.fit(X[:,:])
X[:, :] = imputer.transform(X[:, :])
j=0
for i in X:
   if i[0]>=50:
      dataset.at[j,'under50']=0
   else:
      dataset.at[j,'under50']=1
   j=j+1
Y = dataset.iloc[:,6].values
X = dataset.iloc[:,2:6 ].values
imputer = SimpleImputer(missing_values=np.nan, strategy='mean') 
imputer = imputer.fit(X[:,:])
X[:, :] = imputer.transform(X[:, :])
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=0)
# feature scaling
sc_X = StandardScaler()
X_train = sc_X.fit_transform(X_train)
X_test = sc_X.transform(X_test)