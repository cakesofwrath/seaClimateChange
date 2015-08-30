import pandas as pd
import json
import pprint


if __name__ == "__main__":
    with open("../data/zosgaRaw.json", "r") as zF:
        zosgaRaw = json.load(zF)
        # pprint.pprint(zosga)

    # zosgaRaw[""]

    cZosga = {}
    # format:
    # {
    #   "2005": {
    #       "sum": 15.53, "ct": "3"
    #   },
    #   ...
    # }

    for i in range(len(zosgaRaw["time"])):
        time = str(int(zosgaRaw["time"][i] / 365))
        val = zosgaRaw["zosga"][i]
        if time not in cZosga:
            cZosga[time] = {
                "sum": 0.0,
                "ct": 0
            }
        cZosga[time]["sum"] += val
        cZosga[time]["ct"] += 1

    # zosgaData = { yr: for (yr, value) in cZosga }
    zosgaData = []
    summ = 0.0
    for yr in cZosga:
        summ = cZosga[yr]["sum"] / cZosga[yr]["ct"]
        
        # fixYr = 
        zosgaData.append({
            "yr": yr,
            "Global Mean Sea Level Change (mm)": summ * 100.0
        })
        # zosgaData[yr] = cZosga[yr]["sum"] / cZosga[yr]["ct"]

    # pprint.pprint(zosgaData)    
    print json.dumps(zosgaData)
    # print len(zosgaRaw["time"]), len(zosgaRaw["zosga"]) # the same

