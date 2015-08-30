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

    finalData = []
    for row in data.values:
        r = list(row)
        start = float(r[0])
        year = int(start)
        rem = start - year

        base = datetime(year, 1, 1)
        result = base + timedelta(seconds=(base.replace(year=base.year + 1) - base).total_seconds() * rem)
        # print result, str(result)
        finalData.append({
            "yr": r[0],
            "date": result.strftime("%Y-%m-%d"),
            "Global Mean Sea Level Change (mm)": r[1]            
        })

    # pprint.pprint(finalData)

    print json.dumps(finalData)

    # print data.values[0][0]
