import cv2
import numpy as np

# Load the face detection classifier
face_cascade = cv2.CascadeClassifier('path_to_haarcascade_frontalface_default.xml')

# Load the OpenPose model for hand detection
hand_net = cv2.dnn.readNetFromCaffe('path_to_hand.prototxt', 'path_to_hand.caffemodel')

# Load the input image
image = cv2.imread('model2')

# Convert the image to grayscale for face detection
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Detect faces in the image
faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

# Create a mask to store the detected regions
mask = np.zeros(image.shape[:2], dtype="uint8")

for (x, y, w, h) in faces:
    cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
    mask[y:y+h, x:x+w] = 255

# Detect hands using OpenPose
hand_net.setInput(cv2.dnn.blobFromImage(image, 1.0, (368, 368), (127.5, 127.5, 127.5), swapRB=True, crop=False))
output = hand_net.forward()
hand_points = output[0, :, :, :]

for i in range(hand_points.shape[0]):
    confidence = hand_points[i, 2]
    if confidence > 0.2:  # Adjust the confidence threshold as needed
        x = int(hand_points[i, 0] * image.shape[1])
        y = int(hand_points[i, 1] * image.shape[0])
        cv2.circle(image, (x, y), 5, (0, 0, 255), -1)

# Combine the face and hand detections
result = cv2.bitwise_and(image, image, mask=mask)

# Save the resulting image
cv2.imwrite('output.png', result)

# Display the result
cv2.imshow('Result', result)
cv2.waitKey(0)
cv2.destroyAllWindows()
