import numpy as np
import matplotlib.pyplot as plt
from keras.preprocessing.image import load_img
from keras.preprocessing.image import img_to_array
from keras.models import load_model

model1 = load_model('essai 1')
model3 = load_model('essai 3')
model_opt = load_model('model opt')


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


from keras.datasets import mnist

objects = mnist
(train_img, train_lab), (test_img, test_lab) = objects.load_data()
train_img = train_img / 255.0
test_img = test_img / 255.0
for m in range(10):
    k = np.random.randint(10000)
    img1 = test_img[k]

    for i in range(28):
        for j in range(28):
            if img1[i][j] <= 0.2:
                img1[i][j] = 0
            else:
                img1[i][j] = 1
    plt.subplot(5,2,m+1)
    plt.imshow(img1, cmap='gray_r')
    prediction = model3.predict(test_img)
    plt.title(f'predit:{np.argmax(prediction[k])},vérité{test_lab[k]},{k}')
    plt.axis('off')
    plt.subplots_adjust(hspace=2)
    print(prediction[k])
plt.show()

'''for i in range(28):
    for j in range(28):
        img1[0][i][j] = 1 - img1[0][i][j]
prediction = model2.predict(img1)
print(prediction)'''
