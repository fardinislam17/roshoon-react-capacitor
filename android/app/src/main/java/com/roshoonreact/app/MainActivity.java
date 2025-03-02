package com.roshoonreact.app;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.browser.Browser; 

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
            finish(); // Close the activity to return control to your app
        }
    }
}
