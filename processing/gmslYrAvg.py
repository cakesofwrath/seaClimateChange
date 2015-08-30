import pandas as pd
import json
import pprint
from datetime import datetime, timedelta

if __name__ == "__main__":
    # with open("../data/gmsl.txt", "r") as raw:
    # data = pd.read_csv("../data/gmsl.txt", sep=r"\s+", dtype=float)
    data = pd.read_csv("../data/gmsl.txt", dtype=float, delim_whitespace=True)
    # print data.columns.values

    data = data[[data.columns.values[2], data.columns.values[11]]]

    prelimData = {}
    for row in data.values:
        r = list(row)
        year = str(int(r[0]))
        if year not in prelimData:
            prelimData[year] = {
                "sum": 0.0,
                "ct": 0
            }
        prelimData[year]["sum"] += r[1]
        prelimData[year]["ct"] += 1
        # start = float(r[0])
        # year = int(start)
        # rem = start - year

        # base = datetime(year, 1, 1)
        # result = base + timedelta(seconds=(base.replace(year=base.year + 1) - base).total_seconds() * rem)
        # # print result, str(result)
        # finalData.append({
        #     "yr": r[0],
        #     "date": result.strftime("%Y-%m-%d"),
        #     "Sea Level Change (mm)": r[1]            
        # })

    # pprint.pprint(finalData)
    finalData = []
    for yr in prelimData:
        avg = prelimData[yr]["sum"] / prelimData[yr]["ct"]
        finalData.append({
            "yr": yr,
            "Global Mean Sea Level Change (mm)": avg
            })
    print json.dumps(finalData)

    # print data.values[0][0]
