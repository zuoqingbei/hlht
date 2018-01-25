/*
 * Copyright (c) 2014. 骆驼CMS
 */

package com.ulab.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.ssl.SSLSocketFactory;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;

/**
 * 封装了一些采用HttpClient发送HTTP请求的方法
 * 
 * @see 本工具所采用的是最新的HttpComponents-Client-4.2.1
 * @see 关于本工具类中的一些解释说明,可参考下方列出的我的三篇文章
 * @see http://blog.csdn.net/jadyer/article/details/7615830
 * @see http://blog.csdn.net/jadyer/article/details/7615880
 * @see http://blog.csdn.net/jadyer/article/details/7802139
 * @create Feb 1, 2012 3:02:27 PM
 * @update Oct 8, 2012 3:48:55 PM
 * @author 玄玉<http://blog.csdn/net/jadyer>
 * @version v1.3
 * @history v1.0-->新建<code>sendGetRequest(String,String)</code>和
 *          <code>sendPostRequest(String,Map<String,String>,String,String)</code>
 *          方法
 * @history v1.1-->新增
 *          <code>sendPostSSLRequest(String,Map<String,String>,String,String)</code>
 *          方法,用于发送HTTPS的POST请求
 * @history v1.2-->新增
 *          <code>sendPostRequest(String,String,boolean,String,String)</code>
 *          方法,用于发送HTTP协议报文体为任意字符串的POST请求
 * @history v1.3-->新增<code>java.net.HttpURLConnection</code>实现的
 *          <code>sendPostRequestByJava()</code>方法
 */
public class HttpClientUtil {

	private static Log log = LogFactory.getLog(HttpClientUtil.class);

	private HttpClientUtil() {
	}
	private static String getUrl(Map<String, String> pro, String ul) {
		/*
		 * 锛�%3F
		 * 
		 * & %26
		 * 
		 * | %124
		 * 
		 * = %3D
		 * 
		 * # %23
		 * 
		 * / %2F
		 * 
		 * + %2B
		 * 
		 * % %25
		 * 
		 * 绌烘牸 %20
		 * http://blog.sina.com.cn/s/blog_4b985df20100eqox.html
		 */
		String url = "";
		url += ul + "?";
		for (Map.Entry<String, String> entry : pro.entrySet()) {
			String key;
			if ("".equals(entry.getKey()) || entry.getKey() == null
					|| "null".equals(entry.getKey())) {
				key = "\'\'";
			} else {
				key = entry.getKey()+"";
			}
			String value;
			if ("".equals(entry.getValue()) || entry.getValue() == null
					|| "null".equals(entry.getValue())) {
				value = "\'\'";
			} else {
				value = entry.getValue()+"";
			}
			url += key + "=" + value + "&";
		}
		url = url.substring(0, url.length() - 1).replaceAll("[\\t\\n\\r]", "");
		url = url.replaceAll("#", "%23");
		url= url.replaceAll(" ", "%20");
		url=url.replace("{", "%7B");
        url=url.replace("}","%7D");
        url=url.replace("[","%5b");
        url=url.replace("]","%5d");
        url=url.replace("\"", "%22");
      /*  url=url.replace("-", "%2d");
        url=url.replace("_", "%5f");*/
		return url;
	}
	public static String sendGetRequest(String reqURL, Map<String, String> map) {
		reqURL = getUrl(map, reqURL);
		String decodeCharset = null;
		@SuppressWarnings("unused")
		long responseLength = 0; // 鍝嶅簲闀垮害
		String responseContent = null; // 鍝嶅簲鍐呭
		HttpClient httpClient = new DefaultHttpClient(); // 鍒涘缓榛樿鐨刪ttpClient瀹炰緥
		HttpGet httpGet = new HttpGet(reqURL); // 鍒涘缓org.apache.http.client.methods.HttpGet
		try {
			HttpResponse response = httpClient.execute(httpGet); // 鎵цGET璇锋眰
			if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				HttpEntity entity = response.getEntity(); // 鑾峰彇鍝嶅簲瀹炰綋
				if (null != entity) {
					responseLength = entity.getContentLength();
					responseContent = EntityUtils.toString(entity,
							decodeCharset == null ? "UTF-8" : decodeCharset);
					// EntityUtils.consume(entity); // Consume response content
				}
			} else {
				return "timeout";
			}
		} catch (ClientProtocolException e) {
			return "timeout";
		} catch (ParseException e) {
			return "timeout";
			// log.error(e.getMessage(), e);
		} catch (IOException e) {
			return "timeout";
		} finally {
			httpClient.getConnectionManager().shutdown(); // 鍏抽棴杩炴帴,閲婃斁璧勬簮
		}
		if (responseContent == null || "".equals(responseContent)) {
			return "timeout";
		}
		if(responseContent.contains("Traffic  Quota  Control")){
			return "timeout";
		}
		return responseContent;
	}
	/**
	 * 发送HTTP_GET请求
	 * 
	 * @see 该方法会自动关闭连接,释放资源
	 * @param requestURL
	 *            请求地址(含参数)
	 * @param decodeCharset
	 *            解码字符集,解析响应数据时用之,其为null时默认采用UTF-8解码
	 * @return 远程主机响应正文
	 */
	public static String sendGetRequest(String reqURL, String decodeCharset) {
		long responseLength = 0; // 响应长度
		String responseContent = null; // 响应内容
		HttpClient httpClient = new DefaultHttpClient(); // 创建默认的httpClient实例
		HttpGet httpGet = new HttpGet(reqURL); // 创建org.apache.http.client.methods.HttpGet
		try {
			HttpResponse response = httpClient.execute(httpGet); // 执行GET请求
			HttpEntity entity = response.getEntity(); // 获取响应实体
			if (null != entity) {
				responseLength = entity.getContentLength();
				responseContent = EntityUtils.toString(entity,
						decodeCharset == null ? "UTF-8" : decodeCharset);
				EntityUtils.consume(entity); // Consume response content
			}
			System.out.println("请求地址: " + httpGet.getURI());
			System.out.println("响应状态: " + response.getStatusLine());
			System.out.println("响应长度: " + responseLength);
			System.out.println("响应内容: " + responseContent);
		} catch (ClientProtocolException e) {
			log.error(
					"该异常通常是协议错误导致,比如构造HttpGet对象时传入的协议不对(将'http'写成'htp')或者服务器端返回的内容不符合HTTP协议要求等,堆栈信息如下",
					e);
		} catch (ParseException e) {
			log.error(e.getMessage(), e);
		} catch (IOException e) {
			log.error("该异常通常是网络原因引起的,如HTTP服务器未启动等,堆栈信息如下", e);
		} finally {
			httpClient.getConnectionManager().shutdown(); // 关闭连接,释放资源
		}
		return responseContent;
	}

	/**
	 * 发送HTTP_POST请求
	 * 
	 * @see 该方法为<code>sendPostRequest(String,String,boolean,String,String)</code>
	 *      的简化方法
	 * @see 该方法在对请求数据的编码和响应数据的解码时,所采用的字符集均为UTF-8
	 * @see 当<code>isEncoder=true</code>时,其会自动对<code>sendData</code>中的[中文][|][
	 *      ]等特殊字符进行<code>URLEncoder.encode(string,"UTF-8")</code>
	 * @param isEncoder
	 *            用于指明请求数据是否需要UTF-8编码,true为需要
	 */
	public static String sendPostRequest(String reqURL, String sendData,
			boolean isEncoder) {
		return sendPostRequest(reqURL, sendData, isEncoder, null, null);
	}

	/**
	 * 发送HTTP_POST请求
	 * 
	 * @see 该方法会自动关闭连接,释放资源
	 * @see 当<code>isEncoder=true</code>时,其会自动对<code>sendData</code>中的[中文][|][
	 *      ]等特殊字符进行<code>URLEncoder.encode(string,encodeCharset)</code>
	 * @param reqURL
	 *            请求地址
	 * @param sendData
	 *            请求参数,若有多个参数则应拼接成param11=value11¶m22=value22¶m33=value33的形式后,
	 *            传入该参数中
	 * @param isEncoder
	 *            请求数据是否需要encodeCharset编码,true为需要
	 * @param encodeCharset
	 *            编码字符集,编码请求数据时用之,其为null时默认采用UTF-8解码
	 * @param decodeCharset
	 *            解码字符集,解析响应数据时用之,其为null时默认采用UTF-8解码
	 * @return 远程主机响应正文
	 */
	public static String sendPostRequest(String reqURL, String sendData,
			boolean isEncoder, String encodeCharset, String decodeCharset) {
		String responseContent = null;
		HttpClient httpClient = new DefaultHttpClient();

		HttpPost httpPost = new HttpPost(reqURL);
		// httpPost.setHeader(HTTP.CONTENT_TYPE,
		// "application/x-www-form-urlencoded; charset=UTF-8");
		httpPost.setHeader(HTTP.CONTENT_TYPE,
				"application/x-www-form-urlencoded");
		try {
			if (isEncoder) {
				List<NameValuePair> formParams = new ArrayList<NameValuePair>();
				for (String str : sendData.split("&")) {
					formParams.add(new BasicNameValuePair(str.substring(0,
							str.indexOf("=")),
							str.substring(str.indexOf("=") + 1)));
				}
				httpPost.setEntity(new StringEntity(URLEncodedUtils.format(
						formParams, encodeCharset == null ? "UTF-8"
								: encodeCharset)));
			} else {
				httpPost.setEntity(new StringEntity(sendData));
			}

			HttpResponse response = httpClient.execute(httpPost);
			HttpEntity entity = response.getEntity();
			if (null != entity) {
				responseContent = EntityUtils.toString(entity,
						decodeCharset == null ? "UTF-8" : decodeCharset);
				EntityUtils.consume(entity);
			}
		} catch (Exception e) {
			log.error("与[" + reqURL + "]通信过程中发生异常,堆栈信息如下", e);
		} finally {
			httpClient.getConnectionManager().shutdown();
		}
		return responseContent;
	}

	/**
	 * 发送HTTP_POST请求
	 * 
	 * @see 该方法会自动关闭连接,释放资源
	 * @see 该方法会自动对<code>params</code>中的[中文][|][ ]等特殊字符进行
	 *      <code>URLEncoder.encode(string,encodeCharset)</code>
	 * @param reqURL
	 *            请求地址
	 * @param params
	 *            请求参数
	 * @param encodeCharset
	 *            编码字符集,编码请求数据时用之,其为null时默认采用UTF-8解码
	 * @param decodeCharset
	 *            解码字符集,解析响应数据时用之,其为null时默认采用UTF-8解码
	 * @return 远程主机响应正文
	 */
	public static String sendPostRequest(String reqURL,
			Map<String, String> params, String encodeCharset,
			String decodeCharset) {
		String responseContent = null;
		HttpClient httpClient = new DefaultHttpClient();

		HttpPost httpPost = new HttpPost(reqURL);
		List<NameValuePair> formParams = new ArrayList<NameValuePair>(); // 创建参数队列
		for (Map.Entry<String, String> entry : params.entrySet()) {
			formParams.add(new BasicNameValuePair(entry.getKey(), entry
					.getValue()));
		}
		try {
			httpPost.setEntity(new UrlEncodedFormEntity(formParams,
					encodeCharset == null ? "UTF-8" : encodeCharset));

			HttpResponse response = httpClient.execute(httpPost);
			HttpEntity entity = response.getEntity();
			if (null != entity) {
				responseContent = EntityUtils.toString(entity,
						decodeCharset == null ? "UTF-8" : decodeCharset);
				EntityUtils.consume(entity);
			}
		} catch (Exception e) {
			log.error("与[" + reqURL + "]通信过程中发生异常,堆栈信息如下", e);
		} finally {
			httpClient.getConnectionManager().shutdown();
		}
		return responseContent;
	}
	public static String sendPostRequest(String reqURL,
			Map<String, String> params) {
		return sendPostRequest(reqURL, params,null,null);
	}
	/**
	 * 发送HTTPS_POST请求
	 * 
	 * @see 该方法为<code>sendPostSSLRequest(String,Map<String,String>,String,String)</code>
	 *      方法的简化方法
	 * @see 该方法在对请求数据的编码和响应数据的解码时,所采用的字符集均为UTF-8
	 * @see 该方法会自动对<code>params</code>中的[中文][|][ ]等特殊字符进行
	 *      <code>URLEncoder.encode(string,"UTF-8")</code>
	 */
	public static String sendPostSSLRequest(String reqURL,
			Map<String, String> params) {
		return sendPostSSLRequest(reqURL, params, null, null);
	}

	/**
	 * 发送HTTPS_POST请求
	 * 
	 * @see 该方法会自动关闭连接,释放资源
	 * @see 该方法会自动对<code>params</code>中的[中文][|][ ]等特殊字符进行
	 *      <code>URLEncoder.encode(string,encodeCharset)</code>
	 * @param reqURL
	 *            请求地址
	 * @param params
	 *            请求参数
	 * @param encodeCharset
	 *            编码字符集,编码请求数据时用之,其为null时默认采用UTF-8解码
	 * @param decodeCharset
	 *            解码字符集,解析响应数据时用之,其为null时默认采用UTF-8解码
	 * @return 远程主机响应正文
	 */
	public static String sendPostSSLRequest(String reqURL,
			Map<String, String> params, String encodeCharset,
			String decodeCharset) {
		String responseContent = "";
		HttpClient httpClient = new DefaultHttpClient();
		X509TrustManager xtm = new X509TrustManager() {
			public void checkClientTrusted(X509Certificate[] chain,
					String authType) throws CertificateException {
			}

			public void checkServerTrusted(X509Certificate[] chain,
					String authType) throws CertificateException {
			}

			public X509Certificate[] getAcceptedIssuers() {
				return null;
			}
		};
		try {
			SSLContext ctx = SSLContext.getInstance("TLS");
			ctx.init(null, new TrustManager[] { xtm }, null);
			SSLSocketFactory socketFactory = new SSLSocketFactory(ctx);
			httpClient.getConnectionManager().getSchemeRegistry()
					.register(new Scheme("https", 443, socketFactory));

			HttpPost httpPost = new HttpPost(reqURL);
			List<NameValuePair> formParams = new ArrayList<NameValuePair>();
			for (Map.Entry<String, String> entry : params.entrySet()) {
				formParams.add(new BasicNameValuePair(entry.getKey(), entry
						.getValue()));
			}
			httpPost.setEntity(new UrlEncodedFormEntity(formParams,
					encodeCharset == null ? "UTF-8" : encodeCharset));

			HttpResponse response = httpClient.execute(httpPost);
			HttpEntity entity = response.getEntity();
			if (null != entity) {
				responseContent = EntityUtils.toString(entity,
						decodeCharset == null ? "UTF-8" : decodeCharset);
				EntityUtils.consume(entity);
			}
		} catch (Exception e) {
			log.error("与[" + reqURL + "]通信过程中发生异常,堆栈信息为", e);
		} finally {
			httpClient.getConnectionManager().shutdown();
		}
		return responseContent;
	}

	/**
	 * 发送HTTP_POST请求
	 * 
	 * @see 若发送的<code>params</code>中含有中文,记得按照双方约定的字符集将中文
	 *      <code>URLEncoder.encode(string,encodeCharset)</code>
	 * @see 本方法默认的连接超时时间为30秒,默认的读取超时时间为30秒
	 * @param reqURL
	 *            请求地址
	 * @param params
	 *            发送到远程主机的正文数据,其数据类型为<code>java.util.Map<String, String></code>
	 * @return 远程主机响应正文`HTTP状态码,如<code>"SUCCESS`200"</code><br>
	 *         若通信过程中发生异常则返回"Failed`HTTP状态码",如<code>"Failed`500"</code>
	 */
	public static String sendPostRequestByJava(String reqURL,
			Map<String, String> params) {
		StringBuilder sendData = new StringBuilder();
		for (Map.Entry<String, String> entry : params.entrySet()) {
			sendData.append(entry.getKey()).append("=")
					.append(entry.getValue()).append("&");
		}
		if (sendData.length() > 0) {
			sendData.setLength(sendData.length() - 1); // 删除最后一个&符号
		}
		return sendPostRequestByJava(reqURL, sendData.toString());
	}

	/**
	 * 发送HTTP_POST请求
	 * 
	 * @see 若发送的<code>sendData</code>中含有中文,记得按照双方约定的字符集将中文
	 *      <code>URLEncoder.encode(string,encodeCharset)</code>
	 * @see 本方法默认的连接超时时间为30秒,默认的读取超时时间为30秒
	 * @param reqURL
	 *            请求地址
	 * @param sendData
	 *            发送到远程主机的正文数据
	 * @return 远程主机响应正文`HTTP状态码,如<code>"SUCCESS`200"</code><br>
	 *         若通信过程中发生异常则返回"Failed`HTTP状态码",如<code>"Failed`500"</code>
	 */
	public static String sendPostRequestByJava(String reqURL, String sendData) {
		HttpURLConnection httpURLConnection = null;
		OutputStream out = null; // 写
		InputStream in = null; // 读
		int httpStatusCode = 0; // 远程主机响应的HTTP状态码
		try {
			URL sendUrl = new URL(reqURL);
			httpURLConnection = (HttpURLConnection) sendUrl.openConnection();
			httpURLConnection.setRequestMethod("POST");
			httpURLConnection.setDoOutput(true); // 指示应用程序要将数据写入URL连接,其值默认为false
			httpURLConnection.setUseCaches(false);
			httpURLConnection.setConnectTimeout(30000); // 30秒连接超时
			httpURLConnection.setReadTimeout(30000); // 30秒读取超时

			out = httpURLConnection.getOutputStream();
			out.write(sendData.toString().getBytes());

			// 清空缓冲区,发送数据
			out.flush();

			// 获取HTTP状态码
			httpStatusCode = httpURLConnection.getResponseCode();

			// 该方法只能获取到[HTTP/1.0 200 OK]中的[OK]
			// 若对方响应的正文放在了返回报文的最后一行,则该方法获取不到正文,而只能获取到[OK],稍显遗憾
			// respData = httpURLConnection.getResponseMessage();

			// //处理返回结果
			// BufferedReader br = new BufferedReader(new
			// InputStreamReader(httpURLConnection.getInputStream()));
			// String row = null;
			// String respData = "";
			// if((row=br.readLine()) != null){
			// //readLine()方法在读到换行[\n]或回车[\r]时,即认为该行已终止
			// respData = row; //HTTP协议POST方式的最后一行数据为正文数据
			// }
			// br.close();

			in = httpURLConnection.getInputStream();
			byte[] byteDatas = new byte[in.available()];
			in.read(byteDatas);
			return new String(byteDatas) + "`" + httpStatusCode;
		} catch (Exception e) {
			log.error(e.getMessage());
			return "Failed`" + httpStatusCode;
		} finally {
			if (out != null) {
				try {
					out.close();
				} catch (Exception e) {
					log.error("关闭输出流时发生异常,堆栈信息如下", e);
				}
			}
			if (in != null) {
				try {
					in.close();
				} catch (Exception e) {
					log.error("关闭输入流时发生异常,堆栈信息如下", e);
				}
			}
			if (httpURLConnection != null) {
				httpURLConnection.disconnect();
				httpURLConnection = null;
			}
		}
	}
	
	public static String sendGetRequestHsh(String reqURL) {
		Map<String, String> map=new HashMap<String, String>();
		if(reqURL.indexOf("?")!=-1){
			//地址当中包含？ 需要拆分
			String[] splits=reqURL.split("\\?");
			reqURL=splits[0];
			//生成参数
			String[] param=splits[1].split("&");
			for(String pa:param){
				map.put(pa.split("=")[0], pa.split("=")[1]);
			}
		}
		reqURL = getUrl(map, reqURL).trim();
		String decodeCharset = null;
		@SuppressWarnings("unused")
		long responseLength = 0; // 鍝嶅簲闀垮害
		String responseContent = null; // 鍝嶅簲鍐呭
		HttpClient httpClient = new DefaultHttpClient(); // 鍒涘缓榛樿鐨刪ttpClient瀹炰緥
		HttpGet httpGet = new HttpGet(reqURL); // 鍒涘缓org.apache.http.client.methods.HttpGet
		try {
			HttpResponse response = httpClient.execute(httpGet); // 鎵цGET璇锋眰
			if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				HttpEntity entity = response.getEntity(); // 鑾峰彇鍝嶅簲瀹炰綋
				if (null != entity) {
					responseLength = entity.getContentLength();
					responseContent = EntityUtils.toString(entity,
							decodeCharset == null ? "UTF-8" : decodeCharset);
					// EntityUtils.consume(entity); // Consume response content
				}
			} else {
				return "timeout";
			}
		} catch (ClientProtocolException e) {
			return "timeout";
		} catch (ParseException e) {
			return "timeout";
			// log.error(e.getMessage(), e);
		} catch (IOException e) {
			return "timeout";
		} finally {
			httpClient.getConnectionManager().shutdown(); // 鍏抽棴杩炴帴,閲婃斁璧勬簮
		}
		if (responseContent == null || "".equals(responseContent)) {
			return "timeout";
		}
		if(responseContent.contains("Traffic  Quota  Control")){
			return "timeout";
		}
		return responseContent;
	}
	 /**
     * 向指定URL发送GET方法的请求
     * 
     * @param url
     *            发送请求的URL
     * @param param
     *            请求参数，请求参数应该是 name1=value1&name2=value2 的形式。
     * @return URL 所代表远程资源的响应结果
     */
    public static  Map<String,Object> sendGet(String url) {
        BufferedReader in = null;
        Map<String,Object> result=new HashMap<String, Object>();
        try {
            String urlNameString = url ;
            URL realUrl = new URL(urlNameString);
            // 打开和URL之间的连接
            URLConnection connection = realUrl.openConnection();
            // 设置通用的请求属性
            connection.setRequestProperty("accept", "*/*");
            connection.setRequestProperty("connection", "Keep-Alive");
            connection.setRequestProperty("user-agent",
                    "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            // 建立实际的连接
            connection.connect();
            // 获取所有响应头字段
            Map<String, List<String>> map = connection.getHeaderFields();
            // 遍历所有的响应头字段
            for (String key : map.keySet()) {
                //System.out.println(key + "--->" + map.get(key));
            }
            // 定义 BufferedReader输入流来读取URL的响应
            in = new BufferedReader(new InputStreamReader(
                    connection.getInputStream()));
          /*  String line;
            while ((line = in.readLine()) != null) {
                result += line;
            }*/
            result.put("success", true);
        } catch (Exception e) {
            System.out.println("发送GET请求出现异常！" + e);
            result.put("success", false);
            result.put("msg",  e.getMessage());
        }
        // 使用finally块来关闭输入流
        finally {
            try {
                if (in != null) {
                    in.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return result;
    }
	
}