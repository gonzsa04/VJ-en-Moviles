package es.ucm.fdi.moviles.pr1;

import android.graphics.Bitmap;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import es.ucm.fdi.moviles.androidversion.Game;

public class MainActivity extends AppCompatActivity {

    Bitmap sprite;
    Game game;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        game = new Game(this);
        setContentView(game.getGraphics());
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

