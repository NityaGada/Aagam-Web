import cv2
import numpy as np

# Load the image
image = cv2.imread('model2.png')

# Load the face detection model
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Convert the image to grayscale
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Detect faces in the image
faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)

# Iterate over the detected faces (assuming there's only one face)
for (x, y, w, h) in faces:
    # Crop and extract the face region
    face_roi = image[y:y + h, x:x + w]

# Define regions for the hands (you need to manually adjust these coordinates)
hands_x1, hands_x2, hands_y1, hands_y2 = 100, 200, 300, 450  # Adjust these coordinates

# Crop and extract the hands region
hands_roi = image[hands_y1:hands_y2, hands_x1:hands_x2]

# Create a blank canvas with the same size as the original image
combined_image = np.zeros_like(image)

# Paste the extracted face and hands onto the blank canvas
combined_image[y:y + h, x:x + w] = face_roi
combined_image[hands_y1:hands_y2, hands_x1:hands_x2] = hands_roi

# Save the combined image
cv2.imwrite('face_and_hands_2.png', combined_image)
