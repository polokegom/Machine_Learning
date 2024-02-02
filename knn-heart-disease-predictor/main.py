import numpy as np
from sklearn.neighbors import KNeighborsRegressor as KNN
from sklearn.metrics import accuracy_score
import pandas as panda



medDataset = panda.read_csv("cardio_disease_dataset.csv", delimiter=';', header=0);
print(">>Successfully loaded data<<")
training_vector_x = medDataset.iloc[1:63000,1:-1]
training_prediction = medDataset.iloc[1: 63000, -1] #medDataset.iloc[::medDataset.shape[1]]
test_vector_x = medDataset.iloc[63001:,1:-1]
true_test_prediction = medDataset.iloc[63001:,-1]

model  = KNN(n_neighbors=19)
model.fit(training_vector_x, training_prediction);
print(">>Successfully trained model<<")

'''Testing models accuracy'''
test_predictions = np.round(np.abs(model.predict(test_vector_x))).astype(int)
accuracy = accuracy_score(true_test_prediction,test_predictions)
print('accuracy score: '+ str(accuracy))



'''print(adults_dataset.head());
plot.scatter(adults_dataset['education'],adults_dataset['age'],label="education vs age")
plot.xlabel("Adult Information:")
plot.ylabel("Income");
plot.title("Income vs Adult Information:");
plot.legend();
#mt.scatter(data[:,0], data[:,1], c=kmeans.labels_, cmap='viridis', alpha=0.5)
#mt.title("Wealth Indicator")
plot.show()
'''