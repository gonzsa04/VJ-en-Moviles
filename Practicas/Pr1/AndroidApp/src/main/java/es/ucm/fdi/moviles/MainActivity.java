package es.ucm.fdi.moviles;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import es.ucm.fdi.androidversion.AndroidGame;
import es.ucm.fdi.logic.GameInitializer;

public class MainActivity extends AppCompatActivity {

    AndroidGame game;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        game = new AndroidGame(this);
        GameInitializer gameInitializer = new GameInitializer(game);
        gameInitializer.init();
        setContentView(game.getSurfaceView());
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
