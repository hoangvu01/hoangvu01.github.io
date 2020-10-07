import pandas, json, os
import numpy as np

def filterFalseIata(iata):
    return "NA" if iata == '\\N' else iata

airports = pandas.read_csv('Data/airports-extended.csv', encoding='utf8', na_values=["NA"])
airports = airports.replace(np.nan, "NA", regex=True)
airportAccumulator = {}
for row in airports.itertuples():
    airportAccumulator[str(row.Id)] = {
        "id" : row.Id,
        "name" : row.Name,
        "city" : row.City,
        "iata" : filterFalseIata(row.IATA),
        "position" : [float(row.Longitude),
                      float(row.Latitude),
                      float(row.Altitude)]
    }


with open('./Data/airports.json', "w", encoding='utf8') as outFile:
    json.dump([v for k,v in airportAccumulator.items()], outFile, ensure_ascii=False)


flights = pandas.read_csv('Data/routes.csv', encoding='utf8', na_values=["NA"])
flights = flights.replace(r'^\s*$', "NA", regex=True)
flightAccumulator = []
for row in flights.itertuples():
    if row.SrcID == '\\N' or row.DestID == '\\N':
        continue
    flightAccumulator.append(dict(
        {
            "from" : airportAccumulator[row.SrcID]['position'],
            "to" : airportAccumulator[row.DestID]['position']
        })
    )


with open('./Data/routes.json', "w", encoding='utf8') as outFile:
    json.dump(flightAccumulator, outFile, ensure_ascii=False)
