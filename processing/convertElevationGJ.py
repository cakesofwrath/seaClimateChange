import pandas as pd
import json

with open("../data/usiei.geo.json", "r") as f:
    data = json.load(f)

ans = {
    "type": "FeatureCollection",
    "features": []
}

for feat in data["features"]:
    coords = []
    for o in range(len(feat["geometry"]["coordinates"])):
        coords.append([])
        for i in range(len(feat["geometry"]["coordinates"][o])):
            coords[o].append([])
            for c in range(len(feat["geometry"]["coordinates"][o][i])):
                cd = feat["geometry"]["coordinates"][o][i][c]
                # print cd[0]
                # print "\n\n\n\n\n\n"
                if (cd[0] / 100000.0 == None or cd[0] / 100000.0 != cd[0] / 100000.0) or (cd[1] / 100000.0 == None or cd[1] / 100000.0 != cd[1] / 100000.0):
                    print cd
                coords[o][i].append([cd[0] / 100000.0, cd[1] / 100000.0])

    ff = {
        "type": "Feature",
        "properties": feat["properties"],
        "geometry": {
            "type": "MultiPolygon",
            "coordinates": coords
        }
    }
    ans["features"].append(ff)

print json.dumps(ans)
