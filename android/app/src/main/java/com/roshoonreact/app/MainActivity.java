package com.roshoonreact.app;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.PluginCall;
import com.getcapacitor.Bridge;

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
        
        if (data != null && "roshoon://auth-callback".equals(data.toString())) {
            Browser.close();
        }
    }
}
