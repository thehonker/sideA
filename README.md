# sideA
Generate index labels for your music collection based on Discogs data


Usage:

```bash
node fetch-release-info.mjs 1828655 | tee data.csv
```

Then, open the glabels template and point the variable merge function at the csv.

## autoprint

```bash
source env.inc
./autoprint 1828655
```
