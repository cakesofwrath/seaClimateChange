import pandas as pd
import json
import pprint

if __name__ == "__main__":
    # with open("../data/gmsl.txt", "r") as raw:
    # data = pd.read_csv("../data/gmsl.txt", sep=r"\s+", dtype=float)
    data = pd.read_csv("../data/gmsl.txt", dtype=float, delim_whitespace=True)
    # print data.columns.values

    data = data[[data.columns.values[2], data.columns.values[11]]]

    finalData = []
    for row in data.values:
        finalData.append(list(row))

    # pprint.pprint(finalData)

    print json.dumps(finalData)

    # print data.values[0][0]
