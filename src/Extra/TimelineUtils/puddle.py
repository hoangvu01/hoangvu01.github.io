import json

id = 0
data = []
for i in range(-100, 100):
    for j in range(-100, 100):
        data.append(dict({
            "id" : id,
            "position" : [i / 10, j / 10, 0]
        }))
        id += 1

with open('puddle.json', "w") as outFile:
    json.dump(data, outFile)
