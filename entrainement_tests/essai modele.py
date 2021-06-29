import numpy as np
import matplotlib.pyplot as plt
from keras.preprocessing.image import load_img
from keras.preprocessing.image import img_to_array
from keras.models import load_model

model1 = load_model('essai 1')
model3 = load_model('essai 3')
model = load_model('model opt')


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
'''for k in range(1,20):
    if k<10:
        img1 = load_image(f'{k}_t.png')
    if k == 10:
        img1 = load_image('2f.JPG')
    if k>10:
        img1 = load_image(f'{k-10}_t.png')'''



#for i in range(28):
    #for j in range(28):
        #img1[0][i][j] = 1 - img1[0][i][j]
'''prediction = model1.predict(img1)
    prediction_2 = model3.predict(img1)
    img1 = img1[0]'''
'''for i in range(28):
        for j in range(28):
            if img1[i][j] <= 0.2:
                img1[i][j] = 0
            else:
                img1[i][j] = 1'''
'''plt.subplot(10, 2, k)
    plt.imshow(img1, cmap='gray_r')
    if k<10:
        plt.title(f'le modèle 1 predit:{np.argmax(prediction)}')
    else:
        plt.title(f'le modèle 3 predit:{np.argmax(prediction_2)}')
    plt.axis('off')
    plt.subplots_adjust(hspace=2)
    print(prediction)
plt.show()'''
i=0
for k in [2,4,5,6,7,8]:
    if k == 6:
        for j in range (1,7):
            i += 1
            img1 = load_image(f'{k}_t_{j}.png')
            prediction = model.predict(img1)
            plt.subplot(6, 2, i)
            plt.imshow(img1[0], cmap='gray_r')
            plt.title(f'le modèle predit:{np.argmax(prediction)} la vraie: {k}')
            plt.axis('off')
            plt.subplots_adjust(hspace=2)
            print(prediction)

    elif k == 7:
        for j in range(1,3):
            i += 1
            img1 = load_image(f'{k}_t_{j}.png')
            prediction = model.predict(img1)
            plt.subplot(6, 2, i)
            plt.imshow(img1[0], cmap='gray_r')
            plt.title(f'le modèle predit:{np.argmax(prediction)} la vraie: {k}')
            plt.axis('off')
            plt.subplots_adjust(hspace=2)
            print(prediction)
    else:
        i += 1
        img1 = load_image(f'{k}_t_1.png')
        prediction = model.predict(img1)
        plt.subplot(6, 2, i)
        plt.imshow(img1[0], cmap='gray_r')
        plt.title(f'le modèle predit:{np.argmax(prediction)} la vraie: {k}')
        plt.axis('off')
        plt.subplots_adjust(hspace=2)
        print(prediction)
plt.show()
