package es.ucm.fdi.moviles;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;

import es.ucm.fdi.androidversion.AndroidGame;
import es.ucm.fdi.logic.GameInitializer;

public class MainActivity extends AppCompatActivity {

    AndroidGame game;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        game = new AndroidGame(this);
        GameInitializer gameInitializer = new GameInitializer(game);
        game.setState(gameInitializer);
        setContentView(game.getSurfaceView());
        /*getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION);
        getWindow().getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);*/
    }

    protected void onPause(){
        super.onPause();
        game.pause();
    }

    protected void onResume(){
        super.onResume();
        game.resume();
    }
}
