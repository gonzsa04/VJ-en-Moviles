package es.ucm.fdi.moviles.pr1;

import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.view.SurfaceView;
import android.widget.Button;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.content.Context;


import java.io.IOException;
import java.io.InputStream;

public class MainActivity extends AppCompatActivity {

    Bitmap sprite;
    MyView view;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        InputStream inputStream = null;
        try{
            AssetManager assetManager = this.getAssets();
            inputStream = assetManager.open("java.png");
            sprite = BitmapFactory.decodeStream(inputStream);
        }
        catch(IOException io){
            android.util.Log.e("MainActivity", "Error leyendo imagen");
        }
        finally{
            try{
                inputStream.close();
            }
            catch(Exception io){}
        }

        view = new MyView(this);
        setContentView(view);
    }

    protected void onPause(){
        super.onPause();
        view.pause();
    }

    protected void onResume(){
        super.onResume();
        view.resume();
    }



    class MyView extends SurfaceView implements Runnable{

        int x = 100;
        Thread thread;
        volatile boolean running = false;

        public MyView(Context context){
            super(context);
        }

        public void run(){
            while(running){
                while(!getHolder().getSurface().isValid());
                Canvas canvas = getHolder().lockCanvas();
                render(canvas);
                getHolder().unlockCanvasAndPost(canvas);
            }
        }

        public void render(Canvas c){
            c.drawColor(0xFF0000FF); // ARGB
            if(sprite != null)
                c.drawBitmap(sprite, ++x, 100, null);
            invalidate(); // para repintar (igual que cuand haciamos el pintado pasivo)
        }

        public void resume(){
            if(!running){
                running = true;
                thread = new Thread(this);
                thread.start();
            }
        }

        public void pause(){
            running = false;
            while(true){
                try{
                    thread.join();
                    break;
                }
                catch (InterruptedException ie){}
            }
        }
    }
}

