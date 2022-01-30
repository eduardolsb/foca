package com.focaapplicationcandidate.unydata.focaapplicationcandidate;

/**
 * Created by maste on 29/08/2017.
 */

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Build;
import android.os.IBinder;
import android.os.PowerManager;
import android.support.annotation.RequiresApi;
import android.telephony.TelephonyManager;
import android.widget.Toast;

import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.StatusLine;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;

import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Timer;
import java.util.TimerTask;

public class RSSPullService extends Service {

    public static String IP = "201.65.0.71"; //produ��o
    //public static String IP = "192.168.0.196"; //desenvolvimento

    public static String IDCLIENTE = null;

    public static String IMAGE = null;
    public static String IDVEICULOCAM = null;

    private Boolean SERVICECAM = false;

    private int INTERNETSTATUS = 1;
    private static Boolean CONEXAO = true;
    private int COUNTER = 10;
    private static final long INTERVAL = 60000;
    Timer timer = new Timer();

    @Override
    public IBinder onBind(Intent intent) {
        // We don't provide binding, so return null
        return null;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Toast.makeText(this, "Service Destroy", Toast.LENGTH_LONG).show();
    }

    public void onCreate() {
        super.onCreate();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {

        System.out.println("start IN----------------------------------------------");
        System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>> IN----------------------------------------------");
        System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>> IN----------------------------------------------");

        startservice();

        if(SERVICECAM == false){
            //startSetImage();
        }

        PowerManager powerManager = (PowerManager) getSystemService(POWER_SERVICE);
        PowerManager.WakeLock wakeLock = powerManager.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "MyWakelockTag");
        wakeLock.acquire();

        return Service.START_STICKY;
    }

    public void startSetImage(){

        SERVICECAM = true;

        final String imei = getImei();

        new Thread(new Runnable( )
        {
            public void run( )
            {
                if(IMAGE != null){

                    String url = "";
                    System.out.println("NUMERO TOTAL: ");
                    System.out.println(IMAGE.length());

                    int indiceInicial = 0;
                    int indiceFinal = 1000;
                    int total = (IMAGE.length() / 1000);
                    String imagemPedaco =  IMAGE;
                    String str = "";
                    String imgId = "";
                    for(int i = 0; i < total; i++){
                        String imagemUso = "";
                        if(indiceFinal > total)
                            imagemUso = imagemPedaco.substring(indiceInicial, indiceFinal);
                        else
                            imagemUso = imagemPedaco.substring(indiceInicial, imagemPedaco.length());

                        try {
                            String encodedurl = URLEncoder.encode(imagemUso,"UTF-8").trim();

                            if(imgId == ""){
                                url = "http://" + IP + "/SatelliteMobile/WebService/Image.aspx?Id=" + IDVEICULOCAM + "&Imei=" + imei + "&ImgId=0&Imagem=data:image/jpeg;base64," + encodedurl;
                                //str = GetData(url, true, RSSPullService.this);
                                imgId = str;
                            }else{
                                url = "http://" + IP + "/SatelliteMobile/WebService/Image.aspx?Id=" + IDVEICULOCAM + "&Imei=" + imei + "&ImgId=" + imgId + "&Imagem=" + encodedurl;
                                //str = GetData(url, true, RSSPullService.this);
                            }


                            System.out.println(str);
                            System.out.println(i);

                        } catch (UnsupportedEncodingException e) {
                            // TODO Auto-generated catch block
                            e.printStackTrace();
                        }

                        indiceFinal = (indiceFinal + 1000);
                        indiceInicial = (indiceInicial + 1000);
                    }

                    RSSPullService.IMAGE = null;
                    RSSPullService.IDVEICULOCAM = null;
                    SERVICECAM = false;

                    System.out.println("-------------------------------------------------------");
                    System.out.println("-------------------------------------------------------");
                    System.out.println("-------------------------------------------------------");

                    System.out.println("DEPOIS");
                }

                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                }

                startSetImage();
            }

        }).start();

    }

    public void startservice() {

        timer.scheduleAtFixedRate( new TimerTask() {

            public void run() {

                startGetNotify();

            }

        }, 0, INTERVAL);
    }

    public void startGetNotify(){
        new Thread(new Runnable(){
            public void run(){

                System.out.println("startNotify IN----------------------------------------------");
                System.out.println(IDCLIENTE);
                System.out.println("startNotify IN----------------------------------------------");
                String url = "http://" + IP + "/Foca/NOTIFICACAO/Default.aspx?Id=" + IDCLIENTE;

                if(IDCLIENTE != null) {

                    String jdados = GetStartData(url, true);

                    System.out.println("STARTNOTIFYSTARTNOTIFYSTARTNOTIFYSTARTNOTIFYSTARTNOTIFY IN----------------------------------------------");
                    System.out.println("STARTNOTIFYSTARTNOTIFYSTARTNOTIFYSTARTNOTIFYSTARTNOTIFY IN----------------------------------------------");
                    System.out.println(jdados);

                    if (CONEXAO == true) {

                        if (!jdados.equals("")) {

                            String[] values = jdados.split("\\u007c");

                            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
                                setNotification(values[0].toString().trim(), values[1].toString().trim());
                            }

                            getAlertNotification();

                        }
                    }

                }
            }
        }).start();
    }

    private static String GetStartData(String url, Boolean postData) {

        String responseFromServer = null;

        try{

            HttpClient httpclient = new DefaultHttpClient();

            httpclient.getParams().setIntParameter("http.connection.timeout", 5000);

            HttpResponse response = httpclient.execute(new HttpGet(url));

            StatusLine statusLine = response.getStatusLine();

            if(statusLine.getStatusCode() == HttpStatus.SC_OK){

                ByteArrayOutputStream out = new ByteArrayOutputStream();
                response.getEntity().writeTo(out);

                out.close();
                responseFromServer = out.toString();

                CONEXAO = true;
            }
        }catch(Exception ex){

            responseFromServer = "Error: " + ex.getMessage();
            CONEXAO = false;
        }
        return responseFromServer;
    }

    @RequiresApi(api = Build.VERSION_CODES.HONEYCOMB)
    @SuppressWarnings("deprecation")
    private  void setNotification(String title, String text){

        NotificationManager manager;
        Notification myNotication;

        if(INTERNETSTATUS == 1) {
            // Create the notification
            Notification notification = new Notification(R.mipmap.ic_launcher, title, System.currentTimeMillis());

            manager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);


            Intent intent = new Intent("com.rj.notitfications.SECACTIVITY");

            PendingIntent pendingIntent = PendingIntent.getActivity(getApplicationContext(), 1, intent, 0);

            Notification.Builder builder = new Notification.Builder(getApplicationContext());

            builder.setAutoCancel(false);
            builder.setTicker(title);
            builder.setContentTitle(title);
            builder.setContentText(text);
            builder.setSmallIcon(R.mipmap.ic_launcher);
            builder.setContentIntent(pendingIntent);
            builder.setOngoing(true);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
                builder.setSubText("");   //API level 16
            }
            builder.setNumber(100);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
                builder.build();
            }

            myNotication = builder.getNotification();
            manager.notify(11, myNotication);
        }
    }

    public void getAlertNotification(){
		/**/
        Uri notification = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        Ringtone r = RingtoneManager.getRingtone(getApplicationContext(), notification);
        r.play();
    }

    private String getImei(){
        TelephonyManager telephonyManager = (TelephonyManager)getSystemService(Context.TELEPHONY_SERVICE);
        return telephonyManager.getDeviceId();
    }
    // Checks Internet Status
    public boolean isOnline() {
        ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        if(cm == null)
            return false;

        final NetworkInfo activeNetwork = cm.getActiveNetworkInfo();
        if (activeNetwork != null && activeNetwork.getState() == NetworkInfo.State.CONNECTED)
            return true;

        return false;
    }

}
