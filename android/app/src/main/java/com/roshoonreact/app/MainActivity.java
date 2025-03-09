// package com.roshoonreact.app;

// import android.content.Intent;
// import android.net.Uri;
// import android.os.Bundle;
// import com.getcapacitor.BridgeActivity;

// public class MainActivity extends BridgeActivity {
//     @Override
//     public void onCreate(Bundle savedInstanceState) {
//         super.onCreate(savedInstanceState);
//         handleAuthCallback();
//     }

//     @Override
//     protected void onNewIntent(Intent intent) {
//         super.onNewIntent(intent);
//         setIntent(intent); // Update the intent to the new one
//         handleAuthCallback();
//     }

//     private void handleAuthCallback() {
//         Intent intent = getIntent();
//         if (intent == null) {
//             return;
//         }

//         Uri data = intent.getData();
//         if (data != null && "roshoon".equals(data.getScheme()) && "auth-callback".equals(data.getHost())) {
//             // Handle the auth callback
//             Intent resultIntent = new Intent();
//             resultIntent.setData(data); // Pass the data back
//             setResult(RESULT_OK, resultIntent);
//             finish(); // Close the activity
//         }
//     }
// }

package com.roshoonreact.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
// import com.getcapacitor.Plugin; // Import the Plugin class
// import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth; // Import the GoogleAuth plugin
// import java.util.ArrayList; // Import the ArrayList class

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    // this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
    //   // Additional plugins you've installed go here
    //   add(GoogleAuth.class);
    // }});
  }
}