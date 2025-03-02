package com.roshoonreact.app;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Bridge;
import com.getcapacitor.plugins.Browser;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        handleAuthCallback();
    }

    private void handleAuthCallback() {
        Intent intent = getIntent();
        String action = intent.getAction();
        Uri data = intent.getData();
        
        if (data != null && "roshoon".equals(data.getScheme()) && "auth-callback".equals(data.getHost())) {
            // Close the browser or web view once the callback is triggered.
            // You can either call finish() or handle the callback properly here
            finish(); // Close the activity to return control to your app
        }
    }
}
