import pywavefront, json

file = pywavefront.Wavefront('Wolf.obj', strict=True, collect_faces=True, parse=True)
vertices = [list(map(lambda x: x / 1.9, tup)) for tup in file.vertices]
edges = []

for face in file.mesh_list[0].faces:
    for i in range(len(face)):
        for j in range(i + 1, len(face)):
            edges.append(dict({
                "from" : vertices[face[i]],
                "to" : vertices[face[j]]
            }))
vertices_dict = []
edges_dict = []

for i in range(len(vertices)):
    vertices_dict.append(dict({
        "id" : i,
        "position" : vertices[i]
    }))

for i in range(len(edges)):
    edges_dict.append(dict({
        "id" : i,
        "from" : edges[i]['from'],
        "to" : edges[i]['to']
    }))


with open('./wolfVertices.json', 'w') as outFile:
    json.dump(vertices_dict, outFile)
with open('./wolfEdges.json', 'w') as outFile:
    json.dump(edges_dict, outFile)
