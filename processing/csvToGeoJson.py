import pandas as pd
import json
import pprint 

globalRaw = pd.read_csv("../data/GlobalStationsLinearSeaLevelTrends.csv")
# print len(globalRaw.columns.values)
globalFeatures = []
for rrow in globalRaw.values:
    row = list(rrow)
    globalFeatures.append({
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [row[11], row[10]]
        },
        "properties": {
            "Name": row[1],
            "MSL Trends (mm/yr)": row[6]
        }
    })

globalRaw = pd.read_csv("../data/USStationsLinearSeaLevelTrends.csv")
for rrow in globalRaw.values:
    row = list(rrow)
    globalFeatures.append({
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [row[11], row[10]]
        },
        "properties": {
            "Name": row[1],
            "MSL Trends (mm/yr)": row[6]
        }
    })

# pprint.pprint(globalFeatures)
print json.dumps(globalFeatures)
