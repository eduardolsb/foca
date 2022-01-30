package com.focaapplicationcandidate.unydata.focaapplicationcandidate;

import android.Manifest;
import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.app.AlarmManager;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.PowerManager;
import android.provider.MediaStore;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.NotificationCompat;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.telephony.TelephonyManager;
import android.util.Base64;
import android.view.Display;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Calendar;


public class MainActivity extends AppCompatActivity {

    private static final int CAMERA_PIC_REQUEST = 1111;
    String imgDecodableString;
    private ValueCallback<Uri> mUploadMessage;
    private final static int FILECHOOSER_RESULTCODE = 1;
    private static int RESULT_LOAD_IMG = 1;
    public static String IMAGEMPRINCIPAL = "";
    NotificationCompat.Builder notification;
    private static final int uniqueid = 123;
    String pnumber, imei;

    @SuppressLint({"JavascriptInterface", "SetJavaScriptEnabled", "AddJavascriptInterface"})
    @SuppressWarnings("deprecation")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);

        getPhoneNumber();

        if (shouldAskPermissions()) {
            askPermissions();
        }

        WebView mWebView = (WebView) findViewById(R.id.webView1);

        mWebView.getSettings().setLoadWithOverviewMode(true);
        WebSettings ws = mWebView.getSettings();

        ws.setJavaScriptEnabled(true);
        ws.setUseWideViewPort(true);
        ws.setDomStorageEnabled(true);
        ws.setBuiltInZoomControls(false);

        final Context myApp = this;
        mWebView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onJsAlert(WebView view, String url, String message, final android.webkit.JsResult result) {
                new AlertDialog.Builder(myApp)
                        .setTitle("FOCA app")
                        .setMessage(message)
                        .setPositiveButton(android.R.string.ok,
                                new AlertDialog.OnClickListener() {
                                    public void onClick(DialogInterface dialog, int wicht) {
                                        result.confirm();
                                    }
                                }).setCancelable(false)
                        .create()
                        .show();
                return true;
            }

            ;
        });


        mWebView.addJavascriptInterface(MainActivity.this, "FOCAApplicationCore");

        mWebView.setPadding(0, 0, 0, 0);
        mWebView.setInitialScale(getScale());


        //mWebView.setWebChromeClient(new WebChromeClient());

        mWebView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return false;
            }
        });

        mWebView.setPadding(0, 0, 0, 0);
        mWebView.setInitialScale(getScale());

        mWebView.loadUrl("file:///android_asset/index.html?IMEI=" + imei);

        startService(new Intent(getBaseContext(), RSSPullService.class));

        Intent myAlarm = new Intent(getApplicationContext(), AlarmReceiver.class);
        PendingIntent recurringAlarm = PendingIntent.getBroadcast(getApplicationContext(), 0, myAlarm, PendingIntent.FLAG_CANCEL_CURRENT);
        AlarmManager alarms = (AlarmManager) this.getSystemService(Context.ALARM_SERVICE);
        Calendar updateTime = Calendar.getInstance();
        alarms.setInexactRepeating(AlarmManager.RTC_WAKEUP, updateTime.getTimeInMillis(), AlarmManager.INTERVAL_DAY, recurringAlarm);

        PowerManager powerManager = (PowerManager) getSystemService(POWER_SERVICE);
        PowerManager.WakeLock wakeLock = powerManager.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "MyWakelockTag");
        wakeLock.acquire();
    }


    protected boolean shouldAskPermissions() {
        return (Build.VERSION.SDK_INT > Build.VERSION_CODES.LOLLIPOP_MR1);
    }

    @TargetApi(23)
    protected void askPermissions() {
        String[] permissions = {
                "android.permission.READ_EXTERNAL_STORAGE",
                "android.permission.WRITE_EXTERNAL_STORAGE"
        };
        int requestCode = 200;
        requestPermissions(permissions, requestCode);
    }

    @SuppressLint("NewApi")
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {

        System.out.println("CAM = REQUEST CODE: " + requestCode);
        System.out.println("CAM = RESULT: " + resultCode);

        if (requestCode == CAMERA_PIC_REQUEST && data != null) {
            System.out.println("CAM = REQUEST");
            //2
            Bitmap thumbnail = (Bitmap) data.getExtras().get("data");

            //3
            int width = 200;
            int height = 359;

            //int width = 540;
            //int height = 960;

            //int width = 679;
            //int height = 1200;
            /**/

            final ByteArrayOutputStream bytes = new ByteArrayOutputStream();

            Bitmap scaledphoto = Bitmap.createScaledBitmap(thumbnail, width, height, true);

            scaledphoto.compress(Bitmap.CompressFormat.JPEG, 10, bytes);

            //byte[] b = convertBitmapToByteArray(getApplicationContext(), thumbnail);

            /**/
            try {
                bytes.flush();
                bytes.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

            System.out.println("CAM = 2");
            //4

            String img_str = Base64.encodeToString(bytes.toByteArray(), Base64.DEFAULT);
            //String img_str = Base64.encodeToString(b, Base64.DEFAULT);

            if (RSSPullService.IMAGE == null) {
                RSSPullService.IMAGE = img_str;
            }
        }


        // When an Image is picked
        if (requestCode == RESULT_LOAD_IMG && resultCode == RESULT_OK
                && null != data) {
            // Get the Image from data

            Uri selectedImage = data.getData();
            String[] filePathColumn = {MediaStore.Images.Media.DATA};

            // Get the cursor
            Cursor cursor = getContentResolver().query(selectedImage,
                    filePathColumn, null, null, null);
            // Move to first row
            cursor.moveToFirst();

            int columnIndex = cursor.getColumnIndex(filePathColumn[0]);
            imgDecodableString = cursor.getString(columnIndex);
            cursor.close();

            String filepath = imgDecodableString;
            File imagefile = new File(filepath);
            FileInputStream fis = null;

            try {
                fis = new FileInputStream(imagefile);
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            }

            Bitmap bm = BitmapFactory.decodeStream(fis);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            bm.compress(Bitmap.CompressFormat.JPEG, 10, baos);
            byte[] b = baos.toByteArray();
            String img_str = Base64.encodeToString(b, Base64.DEFAULT);

            if (RSSPullService.IMAGE == null) {
                RSSPullService.IMAGE = img_str;
            }

            //System.out.println(RSSPullService.IMAGE);

        }
    }

    private int getScale() {
        Display display = ((WindowManager) getSystemService(Context.WINDOW_SERVICE)).getDefaultDisplay();
        int width = display.getWidth();
        Double val = new Double(width) / new Double(width);
        val = val * 80d;
        return val.intValue();
    }

    @JavascriptInterface
    public void clienteid(String id) {
        RSSPullService.IDCLIENTE = id;
    }


    @JavascriptInterface
    public void camOn(String id) {
        System.out.println("CAMERAAAAA" + id);
        System.out.println("ID ::::::::::: " + id);
        System.out.println("ID ::::::::::: " + id);

        RSSPullService.IDVEICULOCAM = id;

        if (RSSPullService.IMAGE != null) {
            Toast.makeText(this, "Aguarde. Existe uma imagem sendo processada neste instante", Toast.LENGTH_LONG).show();
        } else {
            Intent intent = new Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE);
            startActivityForResult(intent, CAMERA_PIC_REQUEST);
        }
    }

    @JavascriptInterface
    public void cancelNotification() {
        System.out.println("cancelNotification");
        NotificationManager nm = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        nm.cancel(0);
    }

    @JavascriptInterface
    public void camAlbumItem() {
        IMAGEMPRINCIPAL = "";

        Intent galleryIntent = new Intent(Intent.ACTION_PICK, android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        startActivityForResult(galleryIntent, RESULT_LOAD_IMG);
    }

    @JavascriptInterface
    public void camAlbum(String id) {
        System.out.println("ID ::::::::::: " + id);
        System.out.println("ID ::::::::::: " + id);

        RSSPullService.IDVEICULOCAM = id;

        if (RSSPullService.IMAGE != null) {
            Toast.makeText(this, "Aguarde. Existe uma imagem sendo processada neste instante", Toast.LENGTH_LONG).show();
        } else {
            Intent galleryIntent = new Intent(Intent.ACTION_PICK, android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
            // Start the Intent
            startActivityForResult(galleryIntent, RESULT_LOAD_IMG);
        }
    }



    public void getPhoneNumber() {
        TelephonyManager telephonyManager = (TelephonyManager) this.getSystemService(Context.TELEPHONY_SERVICE);
        String phonenum, IMEI;
        try {
            if (ActivityCompat.checkSelfPermission(this, Manifest.permission.READ_SMS) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.READ_PHONE_STATE) != PackageManager.PERMISSION_GRANTED) {
                // TODO: Consider calling
                //    ActivityCompat#requestPermissions
                // here to request the missing permissions, and then overriding
                //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
                //                                          int[] grantResults)
                // to handle the case where the user grants the permission. See the documentation
                // for ActivityCompat#requestPermissions for more details.
                return;
            }
            phonenum = telephonyManager.getLine1Number();
            IMEI = telephonyManager.getDeviceId();
        } catch (Exception e) {
            phonenum = "Error!!";
            IMEI = "Error!!";
        }

        pnumber = phonenum;
        imei = IMEI;
    }


    @JavascriptInterface
    public String verifyCamAlbumItem(){
        String result = "";
        if(RSSPullService.IMAGE != null){

            result = "data:image/png;base64," + RSSPullService.IMAGE;

            RSSPullService.IMAGE = null;
        }
        return result;
    }
}
