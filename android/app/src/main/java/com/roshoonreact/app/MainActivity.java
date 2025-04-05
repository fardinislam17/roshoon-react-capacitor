package com.roshoonreact.app;

import android.util.Log;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        registerPlugin(GoogleAuth.class);

    Log.d("GoogleAuth", "Plugin Registered Successfully");
    }
}
