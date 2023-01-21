# Import Libraries 
from flask import render_template, request, Flask
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import json
import base64
import random
import time
import numpy as np

app = Flask(__name__)
CORS(app)

similarityTreshold = 0.8
resultsLimit = 33
lowerLimitSimilarityTreshold = 0.4
updateRate = 60
initialNFTNumber = 30



JSON_PATH="/Users/davidazzato/Desktop/Tesi/Capitolo 3/image_captioning_results_embedded_flamingo.json"
JSON_PATH_INIT="/Users/davidazzato/Desktop/Tesi/Capitolo 3/image_captioning_results_flamingo.json"
IMG_PATH="/Users/davidazzato/Desktop/Tesi/Capitolo 2"


@app.route("/nftDetails", methods=['GET'])
def getNftDetails():
    identifier = int(request.args.get("id"))
    print("calling")
    return getNftById(identifier)
     

    

@app.route("/nft", methods=['GET'])
def nftSearch():
    args = request.args
    args = args.to_dict()
    if(args.get("description")==""):
        return {"elements":randomNFTInizialization()}
    print(args.get("description"))
    print(args.get("similarity"))
    print(args.get("number"))

    return {"elements":mostCompatibleNFT(args.get("description"),args.get("similarity"), args.get("number"))}




if __name__ == "__main__":
    app.run(debug=True)




def getNftById(identifier):
    result = {"similars":[]}

    with open(JSON_PATH_INIT, 'rb') as fp:
            nftList = json.load(fp)
    
    print("Launched getNft")

    for nft in nftList["images"]:
        if (nft["id"]==identifier):
            file_path = IMG_PATH+nft["file_path"][1:]
            with open(file_path, mode = 'rb') as file:
                img = file.read()
                nft["base64Img"]= base64.b64encode(img).decode('utf-8')
                print("Nft found!")
                result["nft"]=nft
            counter = 0
            for nft2 in nftList["images"]:
                if(nft2["collection"]==nft["collection"]) and not (nft2["id"]==nft["id"]):
                    file_path = IMG_PATH+nft2["file_path"][1:]
                    with open(file_path, mode = 'rb') as file:
                        img = file.read()
                        nft2["base64Img"]= base64.b64encode(img).decode('utf-8')
                    counter+=1
                    result["similars"].append(nft2)
                if(counter==20):
                    break
                
            return result

def mostCompatibleNFT(description, minimumSimilarity, number):
    number = int(number)

    if(number==0):
        resultsLimitChosen = resultsLimit
    else:
        resultsLimitChosen = number

    similarityTreshold = float(minimumSimilarity)/100

    print("Search started")
    start_time = time.time()

    model_BERT = SentenceTransformer('bert-base-nli-mean-tokens')

    description_embedded = model_BERT.encode([description])

    with open(JSON_PATH, 'rb') as fp:
        nftList = json.load(fp)

    counter = 0
    results = []

    for nft in nftList["images"]:

        checkEfficentSearch(start_time)

        sentence_embedding = np.array(nft["FlamingoBertEmbedding"])
        similarity = float(cosine_similarity(
        [sentence_embedding],
        description_embedded)[0][0])
        
        if(similarity > similarityTreshold):
            file_path = IMG_PATH+nft["file_path"][1:]
            with open(file_path, mode = 'rb') as file:
                img = file.read()
                nft["base64Img"]= base64.b64encode(img).decode('utf-8')
            
            nft["similarityScore"] = round(similarity,3)
            
            results.append(nft)
            counter += 1

        if (counter >= resultsLimitChosen):
            print("Search completed")
            print("Similarity Treshold Reached: " + str(similarityTreshold))
            print("Results limit Reached: " + str(resultsLimit))
            print("Update rate Reached: " + str(updateRate))
            resetEfficentSearch()
            print("Similarity Treshold Reset: " + str(similarityTreshold))
            print("Results limit Treshold Reset: " + str(resultsLimit))
            print("Update rate Reset: " + str(updateRate))
            print("Search completed in: " + str(round(time.time() - start_time))+"s")
            orderedResults = orderResultsBySimilarity(results)
            return orderedResults

    print("Search completed")
    print("Similarity Treshold Reached: " + str(similarityTreshold))
    print("Results limit Reached: " + str(resultsLimit))
    print("Update rate Reached: " + str(updateRate))
    resetEfficentSearch()
    print("Similarity Treshold Reset: " + str(similarityTreshold))
    print("Results limit Treshold Reset: " + str(resultsLimit))
    print("Update rate Reset: " + str(updateRate))
    print("Search completed in: " + str(round(time.time() - start_time))+"s")
    orderedResults = orderResultsBySimilarity(results)
    return orderedResults

def randomNFTInizialization():
        print("Inizialization Started")

        with open(JSON_PATH_INIT, 'rb') as fp:
            nftList = json.load(fp)

        results = []
        selectedIdx = []

        while(len(selectedIdx) < initialNFTNumber):
            rand_idx = random.randrange(len(nftList["images"]))
            if not(rand_idx in set(selectedIdx)):
                selectedIdx.append(rand_idx)
                nft = nftList["images"][rand_idx]
                file_path = IMG_PATH + nft["file_path"][1:]
                
                with open(file_path, mode = 'rb') as file:
                    img = file.read()
                
                nft["base64Img"]= base64.b64encode(img).decode('utf-8')
                nft["similarityScore"] = -1
                results.append(nft)

        return results


def checkEfficentSearch(start_time):
    global similarityTreshold
    global resultsLimit
    global updateRate

    time_elapsed = time.time() - start_time
    
    if(round(time_elapsed) % updateRate == 0):
        print(time_elapsed)
        similarityTreshold -= similarityTreshold/5
        updateRate*=1.5

    if(similarityTreshold <= lowerLimitSimilarityTreshold):
        resultsLimit = 0

def resetEfficentSearch():
    global resultsLimit
    global similarityTreshold
    global updateRate

    updateRate = 60
    resultsLimit = 33
    similarityTreshold = 0.8

def orderResultsBySimilarity(nftArray):
    #Bubble sort 
    n = len(nftArray)
    swapped = False
    
    for i in range (n-1):
        for j in range(0,n-i-1):
            if(nftArray[j]["similarityScore"]<nftArray[j+1]["similarityScore"]):
                swapped = True
                nftArray[j], nftArray[j+1] = nftArray[j+1], nftArray[j]
        if not swapped:
            return nftArray

    return nftArray
        