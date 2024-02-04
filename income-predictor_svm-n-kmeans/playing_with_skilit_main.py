import numpy as np
import matplotlib.pyplot as plot
from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs
#from sklearn.datasets import Loader
import pandas as panda


#loader = Loader();
np.random.seed(1000)
data, _ = make_blobs(n_samples=300, centers=1, random_state=1000);
kmeans = KMeans(n_clusters=3);
kmeans.fit(data);
adults_dataset = panda.read_csv("/home/polokego/Desktop/Machine_Learning/income-predictor_svm-n-kmeans/adult.csv");
print("Successfully loaded data")

print(adults_dataset.columns)
print(adults_dataset.head());
plot.scatter(adults_dataset['education'],adults_dataset['age'],label="education vs age")
plot.xlabel("Education:")
plot.ylabel("Age");
plot.title("Education vs Age:");
plot.legend();
#mt.scatter(data[:,0], data[:,1], c=kmeans.labels_, cmap='viridis', alpha=0.5)

#mt.title("Wealth Indicator")
plot.show()