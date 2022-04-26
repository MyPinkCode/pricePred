import numpy as np
from csv import reader,writer

# open file in read mode
with open('items.csv', 'r', encoding="utf8") as read_obj:
    # pass the file object to reader() to get the reader object
    csv_reader = list(reader(read_obj))
    # Iterate over each row in the csv using reader object

def area(ch):
    if (" ".join(ch).lower().find(" body ") > -1):
        return "body"
    if (" ".join(ch).lower().find(" hair ") > -1):
        return "hair"
    if (" ".join(ch).lower().find(" face ") > -1):
        return "face"
    if (" ".join(ch).lower().find(" eye ") > -1):
        return "eye"
    return "skin"
items=[]

for i in csv_reader:
    row=[]
    row.append(i[1])
    row.append(np.nan if i[2]=='None' else float(i[2].replace('$', '').strip()))
    row.append(np.nan if i[3]=='None' else float(i[3]))
    row.append(np.nan if i[4]=='None' else int(i[4]))
    row.append(i[len(i)-2])
    row.insert(5,area(i))
    

    items.append(row)

with open('data.csv', 'w') as f:
    write = writer(f)
    write.writerows(items)