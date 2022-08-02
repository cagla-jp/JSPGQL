package GRAPHAPP;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Properties;

import io.javalin.Javalin;
import io.javalin.http.staticfiles.Location;
import oracle.pg.rdbms.pgql.PgqlConnection;
import oracle.ucp.jdbc.PoolDataSource;
import oracle.ucp.jdbc.PoolDataSourceFactory;
public class App {
	public static PgqlConnection pgqlConn;
	public static String strGraph;
	public static String containsdb;
	public static String nodedb;
	public static int sslPort;
	public static int connectorPort;
	public static String keystorePath;
	public static String keystorePassword;
	public static String jdbcDriver;
	public static String user; 
	public static String password;
	public static String sqlldr;
	public static String dbDetail;
	public static final SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyy HH:mm:ss");
	
	public static void main(String[] args) throws SQLException {
		String host = ""; 
		String port = ""; 
		String sid = ""; 
		
		try(InputStream input = App.class.getClassLoader().getResourceAsStream("config.properties")) {
            Properties prop = new Properties();
            if(input == null) {
                System.out.println("Sorry, unable to find config file");
                return;
            }
            prop.load(input);
            host = prop.getProperty("db.host");
            port = prop.getProperty("db.port");
            sid = prop.getProperty("db.sid");
            sqlldr = prop.getProperty("db.sqlldr");
            user = prop.getProperty("db.user");
            password = prop.getProperty("db.password");
            dbDetail =  host + ":" + port + "/" + sid;
            jdbcDriver =  "jdbc:oracle:thin:@" + host + ":" + port + "/" + sid;
            sslPort = Integer.parseInt(prop.getProperty("http2server.sslport"));
            strGraph = prop.getProperty("db.tlinity.graph");
            nodedb = prop.getProperty("db.table.nodedb");
			containsdb = prop.getProperty("db.table.containsdb");
        } catch(IOException ex) {
            ex.printStackTrace();
        }
		
		Connection conn;
		PoolDataSource pds = PoolDataSourceFactory.getPoolDataSource();
		pds.setConnectionFactoryClassName("oracle.jdbc.pool.OracleDataSource");
		pds.setURL(jdbcDriver);
		pds.setUser(user);
		pds.setPassword(password);     
		conn = pds.getConnection();
		conn.setAutoCommit(false);

		pgqlConn = PgqlConnection.getConnection(conn);
		
		Javalin app = Javalin.create(config -> {
			config.enableCorsForAllOrigins();
			config.addSinglePageRoot("/", "/public/views/index.html");
			config.addStaticFiles("/public", Location.CLASSPATH);
		}).start(sslPort);
		
		Controller.startup();
		
		app.post("/queryPGQL", Controller.queryPGQL);
	}
}