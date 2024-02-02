import tensorflow as tf
from tensorflow.python.keras import layers,models
from keras.datasets import mnist
from keras.utils import to_categorical

(training_img, training_label), (test_img, test_label) = mnist.load_data()
print('Get shape of datasets --> ' + str(training_img.shape))
print('Test if index 0 outputs val -->' + str(training_label[0]))
#print(training_img[1])
training_img = training_img /255.0
test_img = test_img / 255.0
training_img = training_img.reshape((60000,28,28,1))
test_img= test_img.reshape((10000,28,28,1))
training_label = to_categorical(training_label)
test_label = to_categorical(test_label)

model = models.Sequential()
model.add(layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(64, (3, 3), activation='relu'))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(64, (3, 3), activation='relu'))
model.add(layers.Flatten())
model.add(layers.Dense(64, activation='relu'))
model.add(layers.Dense(10, activation='softmax'))

model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

model.fit(training_img, training_label, epochs=10, batch_size=64)
