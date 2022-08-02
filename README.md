# JS PGQL

lib>src>main>resources>config.properties
- Enter db properties value, db table, and graph name

Command for strt up gradle:
- macos start up: `./gradlew run`
- windows start up: `gradlew run`

To ensure PGQL is working,

- Link: http://localhost:7000/
- Sample Query: select v.id, v.properties from match (v) on <graphname>
- click on the button to ensure value(s) return
