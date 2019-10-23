from PIL import Image
import pytesseract
import argparse
import cv2
import os
from database import Database

class CardOCR:
  def __init__(self, image_path, id, preprocess='blur'):
    self.image_path = image_path
    self.preprocess = preprocess
    self.card_id = id

  def read(self):
    image = cv2.imread(self.image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    if self.preprocess == "thresh":
      gray = cv2.threshold(gray, 0, 255,
        cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
    elif self.preprocess == "blur":
      gray = cv2.medianBlur(gray, 3)

    filename = "{}.png".format(os.getpid())
    cv2.imwrite(filename, gray)

    text = pytesseract.image_to_string(filename)

    os.remove(filename)

    return text

  def save(self):
    sql = f"UPDATE cards SET metadata = '{self.read()}' WHERE cards.id = {self.card_id}"

    Database().execute(sql)

ap = argparse.ArgumentParser()
ap.add_argument("-i", "--image", required=True,
	help="path to input image to be OCR'd")
ap.add_argument("-p", "--preprocess", type=str, default="thresh",
	help="type of preprocessing to be done")
ap.add_argument("-id", "--id", type=str, required=True,
	help="card id from database")

args = vars(ap.parse_args())

ocr = CardOCR(args["image"], args["id"], preprocess=args["preprocess"])
print(ocr.save())
