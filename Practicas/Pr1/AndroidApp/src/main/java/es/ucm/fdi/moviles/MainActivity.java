package es.ucm.fdi.moviles;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.SurfaceView;

import es.ucm.fdi.androidversion.AndroidGame;
import es.ucm.fdi.logic.GameState;

public class MainActivity extends AppCompatActivity {

    AndroidGame game;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        game = new AndroidGame(this);
        GameState gameState = new GameState(game);
        gameState.init();
        game.setState(gameState);
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
