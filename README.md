# TLINITY

## JS PGQL

lib>src>main>resources>config.properties
- Enter db properties value, db table, and graph name


Command for start up gradle:
- macos start up: `./gradlew run`
- windows start up: `gradlew run`


To ensure PGQL is working,

- Link: http://localhost:7000/
- Sample Query: select v.id, v.properties from match (v) on graphname
- click on the button [Query] to retrieve response result

<img width="400" alt="image" src="https://user-images.githubusercontent.com/36125036/182305953-5ab5517f-37ee-4ba4-a2bb-5a0a58c7d78d.png">


Requirements:

Step 1: Download Oracle Graph Client library from oracle site

https://www.oracle.com/database/technologies/spatialandgraph/property-graph-features/graph-server-and-client/graph-server-and-client-downloads.html

Step 2: unzip oracle-graph-client-22.4.0.zip

Step 3: Ensure build.gradle dependencies include the graph client
Example: implementation fileTree(dir: './oracle-graph-client-22.4.0/lib/', include: '*.jar', exclude: 'ons-19.12.0.0.jar')
