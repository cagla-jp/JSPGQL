package GRAPHAPP;

import static GRAPHAPP.App.pgqlConn;
import static GRAPHAPP.App.strGraph;
import java.util.Map;

import oracle.pg.rdbms.pgql.PgqlStatement;
import oracle.pg.rdbms.pgql.PgqlResultSet;

import io.javalin.http.Handler;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;

@SuppressWarnings("unchecked")
public class Controller {

	public static void startup(){
		long start = System.currentTimeMillis();
		JSONArray jsonA = new JSONArray();
		String pgql = "SELECT COUNT(v) FROM MATCH (v) ON " + strGraph;
		
		try {
			PgqlStatement pstmt = pgqlConn.createStatement();
			PgqlResultSet rs = pstmt.executeQuery(pgql);
			if(rs.first()) {
				jsonA.add("Graph is started");
			}
			pstmt.close();
			rs.close();
		} catch (Exception ex) {
			jsonA.add(GetMethod.printException(ex));
			System.out.println(GetMethod.printException(ex));
		}
		
		long end = System.currentTimeMillis();
		System.out.println((end - start) / 1000F);
	}
	
	/**
	 * Execute PGQL select query
	 * @param { String } PGQL select query
	 * @return { Object } query result
	 */
	public static Handler queryPGQL = ctx -> {
		long start = System.currentTimeMillis();
		JSONArray jsonA = new JSONArray();
		Map<String, Object> mapJSON = ctx.bodyAsClass(Map.class);
		String pgql = mapJSON.get("PGQL").toString();
		PgqlStatement pstmt = null;
		PgqlResultSet rs = null;
		
		try {
			pstmt = pgqlConn.createStatement();
			rs = pstmt.executeQuery(pgql);
			oracle.pgql.lang.ResultSetMetaData rsmd = rs.getMetaData();
			while(rs.next()) {
				int numColumns = rsmd.getColumnCount();
				JSONObject obj = new JSONObject();
				for (int i=1; i<=numColumns; i++) {
					String column_name = rsmd.getColumnName(i);
					obj.put(column_name, rs.getObject(column_name));
				}
				jsonA.add(obj);
			}
		} catch (Exception ex) {
			jsonA.add(GetMethod.printException(ex));
			System.out.println(GetMethod.printException(ex));
		}
		
		rs.close();
		pstmt.close();
		long end = System.currentTimeMillis();
		System.out.println((end - start) / 1000F);
		ctx.json(jsonA);
	};
}
