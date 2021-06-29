
import tensorflow as tf
from matplotlib import pyplot as plt
import numpy as np

import tensorflowjs as tfjs
from keras.datasets import mnist
from keras.models import Sequential
from keras.layers import Flatten,Dense
from sklearn.model_selection import KFold, cross_validate
objects = mnist
(train_img, train_lab), (test_img, test_lab) = objects.load_data()

#Normalisation de la valeur des pixels qui valent entre 0 et 255
train_img=train_img/255.0
test_img=test_img/255.0

# validation croisée pour déterminer le nombre de neuronnes idéales
'''nombre_neuronnes = [128, 256, 512]
nombre_epochs = [50, 100, 150, 200]

k_opt = 0
j_opt = 0
score_opt = 0

for k in nombre_neuronnes:
    for j in nombre_epochs:
        # on initialise le nombre de folds à 5 pour la séparation validation-entrainement
        print("nb_test: {1}".format(len(train_img), len(test_img)), "\n")
        kf = KFold(n_splits=5, shuffle=True, random_state=13)

        # on parcoure les differents folds
        scores = []
        for i, (train_index, validation_index) in enumerate(kf.split(train_img)):
            print("fold: {0} | nb_train: {1} | nb_validation: {2}".format(i, len(train_index), len(validation_index)))

            # on définit les données de validation et d'entrainement pour le fold
            X_train = train_img[train_index]
            X_validation = train_img[validation_index]
            y_train = train_lab[train_index]
            y_validation = train_lab[validation_index]


            # on entraine le modèle
            model = Sequential()  # Création d'une couche du réseau en séquence 1 entrée -1 sortie
            input_layer = Flatten(input_shape=(28, 28))  # compresser l'entrée
            model.add(input_layer)  # ajouter la couche dans le modèle
            hidden_layer1 = Dense(k, activation='relu')  # 512 neuronnes
            model.add(hidden_layer1)
            hidden_layer2 = Dense(k, activation='relu')
            model.add(hidden_layer2)
            output_layer = Dense(10, activation='softmax')
            model.add(output_layer)

            model.compile(optimizer='adam',
                         loss='sparse_categorical_crossentropy',
                         metrics=['accuracy'])
            model.fit(X_train, y_train, epochs=j)

            # mesure de la performance
            loss_and_acc = model.evaluate(X_validation, y_validation, verbose=2)
            scores.append(loss_and_acc[1])

        print()

        # performance avec validation croisée du k
        average_score = np.mean(scores)
        #print(f"Average score (validation) pour k= {k}, {average_score}")

        # k optimal et score optimal sur le jeu de validation
        if average_score > score_opt:
            score_opt, k_opt, j_opt = average_score, k, j

print()
print(f" le nombre de neuronnes idéal est {k_opt}, le nombre d'épochs idéal est {j_opt} son score sur le jeu"
      f" de validation est {score_opt}")'''

def train():
    #Création du modèle
    model = Sequential() # Création d'une couche du réseau en séquence 1 entrée -1 sortie
    input_layer = Flatten(input_shape=(28,28)) #compresser l'entrée
    model.add(input_layer) #ajouter la couche dans le modèle
    hidden_layer1 = Dense(512,activation='relu') # 512 neuronnes
    model.add(hidden_layer1)
    hidden_layer2 = Dense(512,activation='relu')
    model.add(hidden_layer2)
    output_layer = Dense(10,activation='softmax')
    model.add(output_layer)

    #compiling the sequential model
    model.compile(optimizer = 'adam',
                  loss = 'sparse_categorical_crossentropy',
                  metrics=['accuracy'])
    model.fit(train_img, train_lab, epochs=200)
    tfjs.converters.save_keras_model(model, '/Users/taha/Desktop/sudoku-solver/modeles_et_images/dossier')

train()



'''# pour reconnaitre un chiffre
# make a prediction for a new image.
from keras.preprocessing.image import load_img
from keras.preprocessing.image import img_to_array
from keras.models import load_model


# load and prepare the image
def load_image(filename):
    # load the image
    img = load_img(filename, grayscale=True, target_size=(28, 28))
    # convert to array
    img = img_to_array(img)
    # reshape into a single sample with 1 channel
    img = img.reshape(1, 28, 28)
    # prepare pixel data
    img = img.astype('float32')
    img = img / 255.0
    return img

from IPython.display import Image
Image('5img.jpeg',width=250,height=250)
img = load_image('5img.jpeg')
digit=new_model.predict(img)
print('Predicted value : ',np.argmax(digit))'''







