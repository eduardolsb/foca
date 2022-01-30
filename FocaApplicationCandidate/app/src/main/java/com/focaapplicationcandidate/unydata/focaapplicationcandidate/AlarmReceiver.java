package com.focaapplicationcandidate.unydata.focaapplicationcandidate;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class AlarmReceiver extends BroadcastReceiver
{
    @Override
    public void onReceive(Context context, Intent intent)
    {
        Intent myService = new Intent(context, RSSPullService.class);
        context.startService(myService);
    }
}